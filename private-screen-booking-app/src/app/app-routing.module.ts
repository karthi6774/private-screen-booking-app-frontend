import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin/admin.component';
import { AuthGuard } from './admin/auth.guard';
import { LoginComponent } from './admin/login/login.component';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
  {path:"" , redirectTo : 'home',pathMatch: 'full'},
  {path:"home" , component : HomeComponent},
  {
    path:"tyzwvy/admin",
    component:AdminComponent,canActivate:[AuthGuard]
  } ,
  {
    path:"tyzwvy/admin/login",
    component:LoginComponent
  } ,
 /*  {
    path:"admin",
    loadChildren : () => import('./admin/admin.module').then(m => m.AdminModule)
  } */
  {
    path:'book-now',
    loadChildren:() => import('./theatre-booking/theatre-booking.module').then(m => m.TheatreBookingModule)
  },
  {
    path:'contact-help',
    loadChildren:() => import('./contact-help/contact-help.module').then(m => m.ContactHelpModule)
  },
  {path:'**',redirectTo:'home',pathMatch: 'full'}



];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy:PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
