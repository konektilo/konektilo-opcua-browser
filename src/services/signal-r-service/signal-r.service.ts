import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {NodeConverterService} from '../node-converter/node-converter.service';
import * as signalR from '@microsoft/signalr';
import {SettingsStorageService} from '../settings-storage/settings-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private connection: signalR.HubConnection;
  private newMessagesSubscription = new Subject<KonektiloResult>();

  constructor(public settingsStorageService: SettingsStorageService) {
    settingsStorageService.getSettings().then(konektiloSettings => {
      this.connection = new signalR.HubConnectionBuilder()
        .configureLogging(signalR.LogLevel.Debug)
        .withUrl(konektiloSettings.konektiloUrl + '/ws/v1', {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
        })
        .withAutomaticReconnect()
        .build();

      this.connection.on('Subscription', variableData => {
        this.newMessagesSubscription.next(variableData);
      });

      // TODO
      // this.connection.onreconnected(() => this.subscribeToNodes());

      this.connection.start();
    });
  }

  public subscribeToNode(subscriptionNode: SavedNode): void {
    const extractedNode = NodeConverterService.extractNode(subscriptionNode.nodeId);
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      this.connection.send('Subscription', subscriptionNode.opcUaServer, extractedNode.namespace, extractedNode.nodeId,
        extractedNode.nodeTypeLong).then();
    } else {
      this.connection.start().then(() => {
        this.connection.send('Subscription', subscriptionNode.opcUaServer, extractedNode.namespace, extractedNode.nodeId,
          extractedNode.nodeTypeLong).then();
      });
    }
  }

  getNewMessageSubscription(): Subject<KonektiloResult> {
    return this.newMessagesSubscription;
  }

  closeConnection(): Promise<any> {
    return this.connection.stop();
  }
}
