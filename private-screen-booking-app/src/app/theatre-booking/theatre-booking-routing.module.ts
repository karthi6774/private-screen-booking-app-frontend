import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TheatreBookingComponent } from './theatre-booking/theatre-booking.component';

const routes: Routes = [
  {
    path:'',component:TheatreBookingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TheatreBookingRoutingModule { }
