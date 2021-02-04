import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomePage} from './home.page';

import {HomePageRoutingModule} from './home-routing.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {BrowserPageModule} from '../browser/browser.module';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatSelectModule,
    ClipboardModule,
    BrowserPageModule,
    ComponentsModule
  ],
  declarations: [HomePage]
})

export class HomePageModule {
}
