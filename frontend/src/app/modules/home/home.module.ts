import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { HomeRoutingModule } from './home-routing.module';
import { HomeIndexComponent } from './home-index/home-index.component';


@NgModule({
  declarations: [
    HomeIndexComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LeafletModule,
  ]
})
export class HomeModule { }
