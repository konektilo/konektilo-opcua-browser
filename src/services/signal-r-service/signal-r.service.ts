import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {NodeConverterService} from '../node-converter/node-converter.service';
import * as signalR from '@microsoft/signalr';
import {SettingsStorageService} from '../settings-storage/settings-storage.service';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private connection: signalR.HubConnection;
  private newMessagesSubscription = new Subject<KonektiloResult>();

  constructor(public settingsStorage: SettingsStorageService) {
    settingsStorage.getSettings().then(konektiloSettings => {
      this.connection = new signalR.HubConnectionBuilder()
        .configureLogging(signalR.LogLevel.Error)
        .withUrl(konektiloSettings.konektiloUrl + '/ws/v1', {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
          accessTokenFactory: SignalRService.getToken
        })
        .withAutomaticReconnect()
        .build();

      this.connection.on('Subscription', variableData => {
        this.newMessagesSubscription.next(variableData);
      });

      this.connection.start().then();
    });
  }

  private static async getToken(): Promise<string> {
    // @ts-ignore
    const storage = new Storage();
    await storage.ready();
    return storage.get('token');
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
