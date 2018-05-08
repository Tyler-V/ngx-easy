import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EasyVirtualScrollModule } from 'projects/virtual-scroll/src/public_api';
import { VirtualScrollRoutingModule } from './virtual-scroll-routing.module';
import { VirtualScrollComponent } from './virtual-scroll.component';

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
