import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TheatreBookingRoutingModule } from './theatre-booking-routing.module';
import { TheatreBookingComponent } from './theatre-booking/theatre-booking.component';


@NgModule({
  declarations: [
    TheatreBookingComponent
  ],
  imports: [
    CommonModule,
    TheatreBookingRoutingModule
  ]
})
export class TheatreBookingModule { }
