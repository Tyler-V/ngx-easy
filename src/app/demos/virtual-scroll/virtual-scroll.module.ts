import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualScrollRoutingModule } from './virtual-scroll-routing.module';
import { VirtualScrollComponent } from './virtual-scroll.component';
// import { EasyVirtualScrollModule } from '@ngx-easy/virtual-scroll';
import { EasyVirtualScrollModule } from 'projects/virtual-scroll/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    EasyVirtualScrollModule,
    VirtualScrollRoutingModule
  ],
  declarations: [
    VirtualScrollComponent,
  ]
})
export class VirtualScrollModule { }
