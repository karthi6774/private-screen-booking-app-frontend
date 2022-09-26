import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
  {path:"" , component : HomeComponent},
  {path:"home" , component : HomeComponent},
  {
    path:"admin",
    loadChildren : () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path:'book-now',
    loadChildren:() => import('./theatre-booking/theatre-booking.module').then(m => m.TheatreBookingModule)
  },
  {
    path:'contact-help',
    loadChildren:() => import('./contact-help/contact-help.module').then(m => m.ContactHelpModule)
  },
  {path:'**',redirectTo:'/home',pathMatch: 'full'}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
