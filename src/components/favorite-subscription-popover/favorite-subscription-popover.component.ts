import {Component, OnInit} from '@angular/core';
import {NavParams, PopoverController} from '@ionic/angular';
import {PopoverAction} from '../../models/PopoverAction';

@Component({
  selector: 'app-favorite-subscription-popover',
  templateUrl: './favorite-subscription-popover.component.html',
  styleUrls: ['./favorite-subscription-popover.component.scss'],
})
export class FavoriteSubscriptionPopoverComponent implements OnInit {
  popoverAction = PopoverAction;
  inSubscriptions: boolean;
  inFavorites: boolean;

  constructor(public navParams: NavParams, public popoverController: PopoverController) {
  }

  ngOnInit() {
    this.inSubscriptions = this.navParams.data.inSubscriptions;
    this.inFavorites = this.navParams.data.inFavorites;
  }

  onClickClosePopover(popoverAction: string) {
    this.popoverController.dismiss({action: popoverAction});
  }

}
