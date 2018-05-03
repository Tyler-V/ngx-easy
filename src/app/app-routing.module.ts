import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VirtualScrollModule } from './demos/virtual-scroll/virtual-scroll.module';
import { GridModule } from './demos/grid/grid.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/virtual-scroll',
    pathMatch: 'full'
  },
  {
    path: 'virtual-scroll',
    loadChildren: () => VirtualScrollModule,
    data: {
      title: 'virtual-scroll'
    }
  },
  {
    path: 'grid',
    loadChildren: () => GridModule,
    data: {
      title: 'grid'
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
