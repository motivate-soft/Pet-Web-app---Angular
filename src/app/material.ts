
import { NgModule } from '@angular/core';

import {
  MatGridListModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatRadioModule,
  MatMenuModule,
  MatListModule,
  MatDividerModule,
  MatDialogModule,
  MatProgressSpinnerModule
} from "@angular/material";

@NgModule({
  imports: [  
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule, 
    MatCheckboxModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule { }