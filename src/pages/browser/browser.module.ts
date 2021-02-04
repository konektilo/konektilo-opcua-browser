import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {BrowserPageRoutingModule} from './browser-routing.module';

import {BrowserPage} from './browser.page';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {TooltipsModule} from 'ionic4-tooltips';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrowserPageRoutingModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    TooltipsModule,
    ClipboardModule,
    ComponentsModule,
    // Ionic button tooltips
  ],
  declarations: [BrowserPage]
})
export class BrowserPageModule {
}
