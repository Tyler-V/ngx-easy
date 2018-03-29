import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/components/login/login.component';
import { RegisterComponent } from '../login/components/register/register.component';

const routes: Routes = [
  // { path: 'crisis-center', component: CrisisListComponent },
  // { path: 'heroes',        component: HeroListComponent },
  // { path: '',   redirectTo: '/heroes', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: false }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
