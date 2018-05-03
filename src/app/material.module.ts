import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    MatToolbarModule, MatIconModule, MatSidenavModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatDividerModule, MatCardModule,
    MatListModule, MatTooltipModule, MatTableModule
  ],
  exports: [
    MatToolbarModule, MatIconModule, MatSidenavModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatDividerModule, MatCardModule,
    MatListModule, MatTooltipModule, MatTableModule
  ]
})
export class MaterialModule { }
