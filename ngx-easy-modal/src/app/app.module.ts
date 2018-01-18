import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EasyModalModule } from '../ngx-easy-modal/easy-modal.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EasyModalModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
