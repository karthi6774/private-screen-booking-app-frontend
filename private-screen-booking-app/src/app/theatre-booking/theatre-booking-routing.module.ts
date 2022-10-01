import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { TheatreBookingComponent } from './theatre-booking/theatre-booking.component';

const routes: Routes = [
  {
    path:'',component:TheatreBookingComponent
  },
  {
    path:'checkout',component:CheckoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TheatreBookingRoutingModule { }
