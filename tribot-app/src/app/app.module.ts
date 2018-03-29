import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { MaterialModule } from './modules/material/material.module';
import { RoutingModule } from './modules/routing/routing.module';
import { LoginModule } from './modules/login/login.module';

import { AppService } from './app.service';
import { HttpInterceptorService } from './shared/services/http-interceptor.service';

import { httpInterceptorProviders } from './shared/providers/http-interceptor.providers';
import { ngxToastrConfig } from './shared/providers/ngx-toastr.config';

import { AppComponent } from './app.component';

const config: any = {
  'progressBar': true
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    RoutingModule,
    LoginModule,
    ToastrModule.forRoot(ngxToastrConfig)
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    AppService,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
