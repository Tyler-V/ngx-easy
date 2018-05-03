import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EasyVirtualScrollComponent } from './easy-virtual-scroll.component';
import { ScrollIndex, ScrollEvent, ScrollType } from './types';

@NgModule({
  imports: [CommonModule],
  declarations: [EasyVirtualScrollComponent],
  exports: [EasyVirtualScrollComponent]
})
export class EasyVirtualScrollModule { }
