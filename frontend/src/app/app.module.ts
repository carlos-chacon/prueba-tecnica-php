import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullComponent } from './layouts/full/full.component';
import { ApiService } from './shared/services/api.service';
import { HeaderComponent } from './layouts/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
