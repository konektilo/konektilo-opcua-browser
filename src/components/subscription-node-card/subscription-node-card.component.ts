import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {SignalRService} from '../../services/signal-r-service/signal-r.service';
import {PopoverController, ToastController} from '@ionic/angular';
import {FavoriteSubscriptionPopoverComponent} from '../favorite-subscription-popover/favorite-subscription-popover.component';
import {PopoverAction} from '../../models/PopoverAction';

@Component({
  selector: 'app-subscription-node-card',
  templateUrl: './subscription-node-card.component.html',
  styleUrls: ['./subscription-node-card.component.scss'],
})
export class SubscriptionNodeCardComponent implements OnInit {
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
  inSubscriptions = true;
  inFavorites = true;

  constructor(public signalRService: SignalRService, public toastController: ToastController, public popoverController: PopoverController) {
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

  async onClickPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: FavoriteSubscriptionPopoverComponent,
      event: ev,
      translucent: true,
      componentProps: {
        inSubscriptions: this.inSubscriptions,
        inFavorites: false
      }
    });

    await popover.present();

    const {data} = await popover.onDidDismiss();

    switch (data?.action) {
      case PopoverAction.RemoveSubscription:
        this.inSubscriptions = false;
        await this.deleteFromSubscriptions();
        break;
      case PopoverAction.AddFavorite:
        break;
    }
  }
}
