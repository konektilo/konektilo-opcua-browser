import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {SignalRService} from '../../services/signal-r-service/signal-r.service';
import {PopoverController, ToastController} from '@ionic/angular';
import {NodeCardPopoverComponent} from '../node-card-popover/node-card-popover.component';
import {PopoverAction} from '../../models/PopoverAction';
import {KonektiloService} from '../../services/konektilo/konektilo.service';
import {AccessUrlBuilderService} from '../../services/access-url/access-url-builder.service';

@Component({
  selector: 'app-node-card',
  templateUrl: './node-card.component.html',
  styleUrls: ['./node-card.component.scss'],
})
export class NodeCardComponent implements OnInit {
  @Input() savedNode: SavedNode;
  @Input() onChildClickDelete: EventEmitter<SavedNode>;
  @Input() isSubscriptionCard: boolean;

  accessUrl: string;
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

  constructor(public accessUrlBuilderService: AccessUrlBuilderService,
              public signalRService: SignalRService,
              public konektiloService: KonektiloService,
              public toastController: ToastController,
              public popoverController: PopoverController) {
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
      component: NodeCardPopoverComponent,
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

  async updateData() {
    if (this.savedNode !== undefined) {

      if (this.accessUrl === undefined) {
        this.accessUrl = await this.accessUrlBuilderService.build(this.savedNode);
      }

      this.konektiloService.readNode(this.accessUrl).then(fullNode => {
        if (fullNode !== undefined) {
          this.konektiloResult = fullNode.result;
        }
      });
    }
  }
}
