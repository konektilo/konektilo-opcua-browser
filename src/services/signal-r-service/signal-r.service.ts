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

  constructor(public settingsStorage: SettingsStorageService) {
    settingsStorage.getSettings().then(konektiloSettings => {
      this.connection = new signalR.HubConnectionBuilder()
        .configureLogging(signalR.LogLevel.Debug)
        .withUrl(konektiloSettings.konektiloUrl + '/ws/v1', {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
          // accessTokenFactory: SignalRService.testToken
        })
        .withAutomaticReconnect()
        .build();

      this.connection.on('Subscription', variableData => {
        this.newMessagesSubscription.next(variableData);
      });

      // TODO
      // this.connection.onreconnected(() => this.subscribeToNodes());

      this.connection.start().then();
    });
  }

  // private async getToken(): Promise<string> {
  //   console.log('hit');
  //   const token = await this.settingsStorage.getToken();
  //   console.log(token);
  //   return token;
  // }

  // TODO signalr service needs static method to get token
  private static testToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log('asd');
      resolve('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMSIsIm5iZiI6MTYxOTE3NDM0NywiZXhwIjoxNjE5Nzc5MTQ3LCJpYXQiOjE2MTkxNzQzNDd9.azneNlKQQ10_0-SVt_Z3RgpwcW3oYxYsUt6YHktgUjE');
      reject('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMSIsIm5iZiI6MTYxOTE3NDM0NywiZXhwIjoxNjE5Nzc5MTQ3LCJpYXQiOjE2MTkxNzQzNDd9.azneNlKQQ10_0-SVt_Z3RgpwcW3oYxYsUt6YHktgUjE');
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
