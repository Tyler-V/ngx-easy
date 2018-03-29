import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RoutingModule } from '../routing/routing.module';
import { LoginService } from './login.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RoutingModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
