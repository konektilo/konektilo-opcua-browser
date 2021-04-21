import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {SignalRService} from '../../services/signal-r-service/signal-r.service';
import {PopoverController, ToastController} from '@ionic/angular';
import {FavoriteSubscriptionPopoverComponent} from '../favorite-subscription-popover/favorite-subscription-popover.component';
import {PopoverAction} from '../../models/PopoverAction';

@Component({
  selector: 'app-node-card',
  templateUrl: './node-card.component.html',
  styleUrls: ['./node-card.component.scss'],
})
export class NodeCardComponent implements OnInit {
  @Input() savedNode: SavedNode;
  @Input() onChildClickDelete: EventEmitter<SavedNode>;
  @Input() isSubscriptionCard: boolean;

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

  constructor(public signalRService: SignalRService, public toastController: ToastController, public popoverController: PopoverController) {
  }

  ngOnInit() {
    if (this.isSubscriptionCard === true) {
      this.signalRService.getNewMessageSubscription().subscribe(konektiloResult => {
        if (this.savedNode.nodeId === konektiloResult.nodeId && this.savedNode.opcUaServer === konektiloResult.opcUaServer) {
          this.konektiloResult = konektiloResult;
        }
      });
    }
  }

  async onClickPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: FavoriteSubscriptionPopoverComponent,
      event: ev,
      translucent: true,
      componentProps: {
        savedNode: this.savedNode
      }
    });

    await popover.present();

    const {data} = await popover.onDidDismiss();

    switch (data?.action) {
      case PopoverAction.RemoveSubscription:
      case PopoverAction.RemoveFavorite:
        this.onChildClickDelete.emit(this.savedNode);
        break;
    }
  }
}
