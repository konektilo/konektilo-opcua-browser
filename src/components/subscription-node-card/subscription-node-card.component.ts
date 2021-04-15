import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {SignalRService} from '../../services/signal-r-service/signal-r.service';
import {SubscriptionStorageService} from '../../services/subscription-storage/subscription-storage.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-subscription-node-card',
  templateUrl: './subscription-node-card.component.html',
  styleUrls: ['./subscription-node-card.component.scss'],
})
export class SubscriptionNodeCardComponent implements OnInit {
  @Input() subscriptionNode: SubscriptionNode;
  @Input() onChildClickDelete: EventEmitter<SubscriptionNode>;

  konektiloResult: KonektiloResult = {
    nodeId: '-',
    opcUaServer: '-',
    serverTimeStamp: '-',
    sourceTimeStamp: '-',
    statusCode: {Code: 0},
    variableData: undefined,
    variableDisplayname: '-',
    variableStatusCode: '-',
    variableType: '-'
  };

  constructor(public signalRService: SignalRService, public toastController: ToastController) {
  }

  ngOnInit() {
    this.signalRService.getNewMessageSubscription().subscribe(konektiloResult => {
      if (this.subscriptionNode.nodeId === konektiloResult.nodeId && this.subscriptionNode.opcUaServer === konektiloResult.opcUaServer) {
        this.konektiloResult = konektiloResult;
      }
    });
  }

  async deleteFromSubscriptions() {
    this.onChildClickDelete.emit(this.subscriptionNode);

    const toast = await this.toastController.create({
      message: 'Deleted node from subscriptions',
      duration: 2000
    });

    await toast.present();
  }
}
