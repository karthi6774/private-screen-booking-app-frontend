import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';




@NgModule({
  declarations: [
    AlertDialogComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports:[
    AlertDialogComponent
  ]
})
export class SharedModule { }
