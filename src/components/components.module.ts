import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {KonektiloHeaderComponent} from './konektilo-header/konektilo-header.component';
import {KonektiloFooterComponent} from './konektilo-footer/konektilo-footer.component';
import {DetailedNodeComponent} from './detailed-node/detailed-node.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {TooltipsModule} from 'ionic4-tooltips';
import {SubscriptionNodeCardComponent} from './subscription-node-card/subscription-node-card.component';
import {FavoriteNodeCardComponent} from './favorite-node-card/favorite-node-card.component';
import {FavoriteSubscriptionPopoverComponent} from './favorite-subscription-popover/favorite-subscription-popover.component';


@NgModule({
  declarations: [
    KonektiloHeaderComponent,
    KonektiloFooterComponent,
    DetailedNodeComponent,
    SubscriptionNodeCardComponent,
    FavoriteNodeCardComponent,
    FavoriteSubscriptionPopoverComponent],
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ClipboardModule, TooltipsModule],
  exports: [
    KonektiloHeaderComponent,
    KonektiloFooterComponent,
    DetailedNodeComponent,
    SubscriptionNodeCardComponent,
    FavoriteNodeCardComponent,
    FavoriteSubscriptionPopoverComponent]
})
export class ComponentsModule {
}
