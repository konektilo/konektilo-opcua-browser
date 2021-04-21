import {Component, OnInit} from '@angular/core';
import {NavParams, PopoverController} from '@ionic/angular';
import {PopoverAction} from '../../models/PopoverAction';
import {SavedNodesStorageService} from '../../services/saved-nodes-storage/saved-nodes-storage.service';

@Component({
  selector: 'app-favorite-subscription-popover',
  templateUrl: './favorite-subscription-popover.component.html',
  styleUrls: ['./favorite-subscription-popover.component.scss'],
})
export class FavoriteSubscriptionPopoverComponent implements OnInit {
  popoverAction = PopoverAction;
  savedNode: SavedNode;

  constructor(public navParams: NavParams,
              public popoverController: PopoverController,
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
}
