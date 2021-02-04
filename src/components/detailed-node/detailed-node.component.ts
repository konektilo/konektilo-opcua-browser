import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {KonektiloService} from '../../services/konektilo/konektilo.service';
import {KonektiloNodeResponse} from '../../models/KonektiloNodeResponse';
import {ToastController} from '@ionic/angular';
import {SubscriptionStorageService} from '../../services/subscription-storage/subscription-storage.service';

@Component({
  selector: 'app-detailed-node',
  templateUrl: './detailed-node.component.html',
  styleUrls: ['./detailed-node.component.scss'],
})
export class DetailedNodeComponent implements OnChanges {
  @Input() browseNode: KonektiloBrowseNodeInternal;
  fullNode: KonektiloNodeResponse;
  subscriptionNode: SubscriptionNode;
  buttonsDisabled = true;
  dataToDisplay = '';
  subscriptionButtonStyle = 'outline';

  constructor(public konektiloService: KonektiloService,
              public subscriptionStorageService: SubscriptionStorageService,
              public toastController: ToastController) {
    this.updateData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.hasOwnProperty('browseNode') || changes?.browseNode.isFirstChange()) {
      return;
    }
    this.browseNode = changes.browseNode.currentValue;
    this.updateData();
  }

  updateData() {
    if (this.browseNode !== undefined) {
      this.konektiloService.readNode(this.browseNode.accessUrl).subscribe(fullNode => {
        this.fullNode = fullNode;
        this.buttonsDisabled = fullNode === undefined; // Disabled buttons if no node selected

        if (fullNode.result.variableData instanceof Object) {
          this.dataToDisplay = JSON.stringify(fullNode.result.variableData);
        } else {
          this.dataToDisplay = fullNode.result.variableData;
        }

        this.subscriptionNode = {opcUaServer: fullNode.result.opcUaServer, nodeId: fullNode.result.nodeId};
        this.changeSubsButtonStyle().then();
      });
    }
  }

  async showCopyToast() {
    const toast = await this.toastController.create({
      message: 'Konektlo URL of node copied to clipboard.',
      duration: 2000
    });
    await toast.present();
  }

  onAddRemoveFavorites() {
    // TODO add/remove favorites
  }

  async onAddRemoveSubscriptions() {
    let toastText;

    if (await this.subscriptionStorageService.elementInSubscriptions(this.subscriptionNode)) {
      await this.subscriptionStorageService.deleteSubscription(this.subscriptionNode);
      toastText = 'Deleted node from subscriptions';
    } else {
      await this.subscriptionStorageService.saveSubscription(this.subscriptionNode);
      toastText = 'Added node to subscriptions';
    }

    this.changeSubsButtonStyle().then();

    const toast = await this.toastController.create({
      message: toastText,
      duration: 2000
    });
    await toast.present();
  }

  async changeSubsButtonStyle() {
    if (await this.subscriptionStorageService.elementInSubscriptions(this.subscriptionNode)) {
      this.subscriptionButtonStyle = 'solid';
    } else {
      this.subscriptionButtonStyle = 'outline';
    }
  }
}
