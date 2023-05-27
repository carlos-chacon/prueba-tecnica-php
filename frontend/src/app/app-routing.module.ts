import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';

const routes: Routes = [
  {
    path: "",
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: "home", title: 'Humedad por Ciudad', loadChildren: () => import("./modules/home/home.module").then((m) => m.HomeModule) },
      { path: "weather-log", title: 'Histórico de consultas', loadChildren: () => import("./modules/weather-log/weather-log.module").then((m) => m.WeatherLogModule) },
    ]
  },
  {
    path: "**",
    redirectTo: "/",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
