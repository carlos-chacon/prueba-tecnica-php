import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherLogIndexComponent } from './weather-log-index/weather-log-index.component';

const routes: Routes = [
  {path: '', component: WeatherLogIndexComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherLogRoutingModule { }
