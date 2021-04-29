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
import {NodeCardComponent} from './node-card/node-card.component';
import {NodeCardPopoverComponent} from './node-card-popover/node-card-popover.component';


@NgModule({
  declarations: [
    KonektiloHeaderComponent,
    KonektiloFooterComponent,
    DetailedNodeComponent,
    NodeCardComponent,
    NodeCardPopoverComponent],
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ClipboardModule, TooltipsModule],
  exports: [
    KonektiloHeaderComponent,
    KonektiloFooterComponent,
    DetailedNodeComponent,
    NodeCardComponent,
    NodeCardPopoverComponent]
})
export class ComponentsModule {
}
