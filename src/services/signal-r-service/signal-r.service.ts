import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {NodeConverterService} from '../node-converter/node-converter.service';
import * as signalR from '@microsoft/signalR';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private connection: signalR.HubConnection;
  private newMessagesSubscription = new Subject<KonektiloResult>();

  // constructor(public storage: Storage) {
  //   this.appPreferences.fetchKonektiloIp().subscribe(ip => {
  //     this.connection = new signalR.HubConnectionBuilder()
  //       .configureLogging(signalR.LogLevel.Debug)
  //       .withUrl('ws://' + ip + ':5020/ws/v1', {
  //         skipNegotiation: true,
  //         transport: signalR.HttpTransportType.WebSockets
  //       })
  //       .withAutomaticReconnect()
  //       .build();
  //
  //     this.connection.on('Subscription', variableData => {
  //       this.newMessagesSubscription.next(variableData);
  //     });
  //
  //     // TODO
  //     // this.connection.onreconnected(() => this.subscribeToNodes());
  //   });
  // }

  constructor(public storage: Storage) {
    storage.ready().then(() => {
      // TODO get ip/url
      this.storage.get('konektiloUrl').then((konektiloUrl) => {
        this.connection = new signalR.HubConnectionBuilder()
          .configureLogging(signalR.LogLevel.Debug)
          .withUrl('ws://' + '127.0.0.1' + ':5000/ws/v1', {
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
    });
  }

  public subscribeToNode(subscriptionNode: SavedNode): void {
    const extractedNode = NodeConverterService.extractNode(subscriptionNode.nodeId);
    if (this.connection.state === signalR.HubConnectionState.Connected) {
      // this.connection.send('Subscription', 'opcuatestserver', '3', 'cvar_48', 'String').then();
      this.connection.send('Subscription', subscriptionNode.opcUaServer, extractedNode.namespace, extractedNode.nodeId,
        extractedNode.nodeTypeLong).then();
    } else {
      this.connection.start().then(() => {
        // this.connection.send('Subscription', 'opcuatestserver', '3', 'cvar_48', 'String').then();
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
