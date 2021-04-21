import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {KonektiloService} from '../../services/konektilo/konektilo.service';
import {KonektiloNodeResponse} from '../../models/KonektiloNodeResponse';
import {ToastController} from '@ionic/angular';
import {SavedNodesStorageService} from '../../services/saved-nodes-storage/saved-nodes-storage.service';

@Component({
  selector: 'app-detailed-node',
  templateUrl: './detailed-node.component.html',
  styleUrls: ['./detailed-node.component.scss'],
})
export class DetailedNodeComponent implements OnChanges {
  @Input() browseNode: KonektiloBrowseNodeInternal;
  fullNode: KonektiloNodeResponse;
  savedNode: SavedNode;
  buttonsDisabled = true;
  dataToDisplay = '';
  subscriptionButtonStyle = 'outline';
  favoriteButtonStyle = 'outline';

  constructor(public konektiloService: KonektiloService,
              public savedNodesStorageService: SavedNodesStorageService,
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
      this.konektiloService.readNode(this.browseNode.accessUrl).then(fullNode => {
        this.fullNode = fullNode;
        this.buttonsDisabled = fullNode === undefined; // Disabled buttons if no node selected

        if (fullNode.result.variableData instanceof Object) {
          this.dataToDisplay = JSON.stringify(fullNode.result.variableData);
        } else {
          this.dataToDisplay = fullNode.result.variableData;
        }

        this.savedNode = {
          opcUaServer: fullNode.result.opcUaServer,
          nodeId: fullNode.result.nodeId,
          displayName: fullNode.result.variableDisplayname,
          savedAsSubscription: false,
          savedAsFavorite: false
        };
        this.savedNodesStorageService.elementInSavedNodes(this.savedNode).then(tmpNode => {
          if (tmpNode !== undefined) {
            this.savedNode = tmpNode;
          }

          this.changeSubsButtonStyle().then();
          this.changeFavoriteButtonStyle().then();
        });
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

  async onAddRemoveFavorites() {
    let toastText;

    this.savedNode.savedAsFavorite = !this.savedNode.savedAsFavorite;
    await this.savedNodesStorageService.saveNode(this.savedNode);

    if (this.savedNode.savedAsFavorite === true) {
      toastText = 'Added node to favorites';
    } else {
      toastText = 'Deleted node from favorites';
    }

    this.changeFavoriteButtonStyle().then();

    const toast = await this.toastController.create({
      message: toastText,
      duration: 2000
    });
    await toast.present();
  }

  async onAddRemoveSubscriptions() {
    let toastText;

    this.savedNode.savedAsSubscription = !this.savedNode.savedAsSubscription;
    await this.savedNodesStorageService.saveNode(this.savedNode);

    if (this.savedNode.savedAsSubscription === true) {
      toastText = 'Added node to subscriptions';
    } else {
      toastText = 'Deleted node from subscriptions';
    }

    await this.changeSubsButtonStyle();

    const toast = await this.toastController.create({
      message: toastText,
      duration: 2000
    });
    await toast.present();
  }

  async changeSubsButtonStyle() {
    if (this.savedNode.savedAsSubscription === true) {
      this.subscriptionButtonStyle = 'solid';
    } else {
      this.subscriptionButtonStyle = 'outline';
    }
  }

  async changeFavoriteButtonStyle() {
    if (this.savedNode.savedAsFavorite === true) {
      this.favoriteButtonStyle = 'solid';
    } else {
      this.favoriteButtonStyle = 'outline';
    }
  }
}
