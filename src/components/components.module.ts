import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {KonektiloHeaderComponent} from './konektilo-header/konektilo-header.component';
import {KonektiloFooterComponent} from './konektilo-footer/konektilo-footer.component';
import {DetailedNodeComponent} from './detailed-node/detailed-node.component';


@NgModule({
  declarations: [
    KonektiloHeaderComponent,
    KonektiloFooterComponent,
    DetailedNodeComponent],
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
  exports: [
    KonektiloHeaderComponent,
    KonektiloFooterComponent,
    DetailedNodeComponent]
})
export class ComponentsModule {
}
