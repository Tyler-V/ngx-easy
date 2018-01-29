import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EasyGridLayoutComponent } from './easy-grid-layout/easy-grid-layout/easy-grid-layout.component';
import { EasyGridBoxComponent } from './easy-grid-layout/easy-grid-box/easy-grid-box.component';
import { DragDirective } from './easy-grid-layout/directives/drag.directive';
import { EasyGridLayoutService } from './easy-grid-layout/easy-grid-layout.service';

@NgModule({
  declarations: [
    AppComponent,
    EasyGridLayoutComponent,
    EasyGridBoxComponent,
    DragDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [EasyGridLayoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
