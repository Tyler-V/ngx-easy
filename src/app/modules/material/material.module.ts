import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [
    MatToolbarModule, MatIconModule, MatSidenavModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDividerModule
  ],
  exports: [
    MatToolbarModule, MatIconModule, MatSidenavModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDividerModule
  ]
})
export class MaterialModule { }
