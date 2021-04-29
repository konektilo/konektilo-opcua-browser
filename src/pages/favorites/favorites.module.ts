import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {FavoritesPageRoutingModule} from './favorites-routing.module';

import {FavoritesPage} from './favorites.page';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FavoritesPage]
})
export class FavoritesPageModule {
}
