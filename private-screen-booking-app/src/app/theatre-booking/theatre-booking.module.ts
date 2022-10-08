import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TheatreBookingRoutingModule } from './theatre-booking-routing.module';
import { TheatreBookingComponent } from './theatre-booking/theatre-booking.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutComponent } from './checkout/checkout.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TheatreBookingComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    TheatreBookingRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class TheatreBookingModule { }
