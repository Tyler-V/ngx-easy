import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VirtualScrollComponent } from './virtual-scroll.component';

const routes: Routes = [
    {
        path: '',
        component: VirtualScrollComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VirtualScrollRoutingModule { }
