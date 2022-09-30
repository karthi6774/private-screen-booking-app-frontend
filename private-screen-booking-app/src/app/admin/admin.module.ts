import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GetPendingPaymentComponent } from './get-pending-payment/get-pending-payment.component';
import { UpdatePendingPaymentComponent } from './update-pending-payment/update-pending-payment.component';


@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    GetPendingPaymentComponent,
    UpdatePendingPaymentComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
