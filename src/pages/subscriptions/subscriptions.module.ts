import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SubscriptionsPageRoutingModule} from './subscriptions-routing.module';

import {SubscriptionsPage} from './subscriptions.page';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriptionsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SubscriptionsPage]
})
export class SubscriptionsPageModule {
}
