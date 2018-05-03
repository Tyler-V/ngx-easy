import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { EasyGridModule } from '@ngx-easy/grid';
import { EasyGridModule } from 'projects/easy-grid/src/public_api';
import { MomentModule } from 'ngx-moment';
import { GridRoutingModule } from './grid-routing.module';
import { GridComponent } from './grid.component';
import { PhonePipe } from './pipes/phone.pipe';

@NgModule({
  imports: [
    CommonModule,
    EasyGridModule,
    MomentModule,
    GridRoutingModule,
  ],
  declarations: [
    GridComponent,
    PhonePipe,
  ]
})
export class GridModule { }
