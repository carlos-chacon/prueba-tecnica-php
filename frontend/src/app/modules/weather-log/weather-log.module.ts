import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherLogRoutingModule } from './weather-log-routing.module';
import { WeatherLogIndexComponent } from './weather-log-index/weather-log-index.component';


@NgModule({
  declarations: [
    WeatherLogIndexComponent
  ],
  imports: [
    CommonModule,
    WeatherLogRoutingModule
  ]
})
export class WeatherLogModule { }
