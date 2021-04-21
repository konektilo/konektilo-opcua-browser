import {Component, OnInit} from '@angular/core';
import {NavParams, PopoverController, ToastController} from '@ionic/angular';
import {PopoverAction} from '../../models/PopoverAction';
import {SavedNodesStorageService} from '../../services/saved-nodes-storage/saved-nodes-storage.service';
import {AccessUrlBuilderService} from '../../services/access-url/access-url-builder.service';

@Component({
  selector: 'app-node-card-popover',
  templateUrl: './node-card-popover.component.html',
  styleUrls: ['./node-card-popover.component.scss'],
})
export class NodeCardPopoverComponent implements OnInit {
  popoverAction = PopoverAction;
  savedNode: SavedNode;

  constructor(public navParams: NavParams,
              public popoverController: PopoverController,
              public toastController: ToastController,
              public savedNodesStorageService: SavedNodesStorageService) {
  }

  ngOnInit() {
    this.savedNode = this.navParams.data.savedNode;
  }

  async onClickClosePopover(popoverAction: string) {
    switch (popoverAction) {
      case PopoverAction.AddSubscription:
        this.savedNode.savedAsSubscription = true;
        await this.savedNodesStorageService.saveNode(this.savedNode);
        break;
      case PopoverAction.RemoveSubscription:
        this.savedNode.savedAsSubscription = false;
        await this.savedNodesStorageService.saveNode(this.savedNode);
        break;
      case PopoverAction.AddFavorite:
        this.savedNode.savedAsFavorite = true;
        await this.savedNodesStorageService.saveNode(this.savedNode);
        break;
      case PopoverAction.RemoveFavorite:
        this.savedNode.savedAsFavorite = false;
        await this.savedNodesStorageService.saveNode(this.savedNode);
        break;
    }

    await this.popoverController.dismiss({action: popoverAction});
  }

  createAccessUrl() {
    return AccessUrlBuilderService.build(this.savedNode);
  }

  async showCopyToast() {
    const toast = await this.toastController.create({
      message: 'Konektlo URL of node copied to clipboard.',
      duration: 2000
    });
    await toast.present();
  }
}
