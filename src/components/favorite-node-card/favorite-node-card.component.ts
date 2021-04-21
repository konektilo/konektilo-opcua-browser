import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {SignalRService} from '../../services/signal-r-service/signal-r.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-favorite-node-card',
  templateUrl: './favorite-node-card.component.html',
  styleUrls: ['./favorite-node-card.component.scss'],
})
export class FavoriteNodeCardComponent implements OnInit {
  @Input() subscriptionNode: SavedNode;
  @Input() onChildClickDelete: EventEmitter<SavedNode>;

  konektiloResult: KonektiloResult = {
    nodeId: '-',
    opcUaServer: '-',
    serverTimeStamp: '-',
    sourceTimeStamp: '-',
    statusCode: {Code: 0},
    variableData: undefined,
    variableDisplayname: undefined,
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
