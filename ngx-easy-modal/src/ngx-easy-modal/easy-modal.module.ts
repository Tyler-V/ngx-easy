import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EasyModalComponent } from './easy-modal/easy-modal.component';
import { EasyModalService } from './easy-modal.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EasyModalComponent
  ],
  exports: [
    EasyModalComponent
  ],
  entryComponents: [
    EasyModalComponent
  ]
})
export class EasyModalModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: EasyModalModule,
      providers: [
        EasyModalService
      ]
    };
  }
}
