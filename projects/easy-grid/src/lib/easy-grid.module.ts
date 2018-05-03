import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EasyVirtualScrollModule } from '@ngx-easy/virtual-scroll';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { MaterialModule } from './material.module';

import { EasyGridComponent } from './easy-grid.component';
import { EasyGridColumnComponent } from './easy-grid-column/easy-grid-column.component';
import { EasyGridHeaderComponent } from './easy-grid-header/easy-grid-header.component';
import { EasyGridTableComponent } from './easy-grid-table/easy-grid-table.component';
import { EasyGridFooterComponent } from './easy-grid-footer/easy-grid-footer.component';

// @dynamic
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        EasyVirtualScrollModule,
        DeviceDetectorModule.forRoot(),
        MaterialModule
    ],
    declarations: [
        EasyGridComponent,
        EasyGridColumnComponent,
        EasyGridHeaderComponent,
        EasyGridTableComponent,
        EasyGridFooterComponent,
    ],
    exports: [
        EasyGridComponent,
        EasyGridColumnComponent,
    ],
    providers: [],
})
export class EasyGridModule { }
