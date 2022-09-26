import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactHelpComponent } from './contact-help/contact-help.component';

const routes: Routes = [
  {
    path:'',component:ContactHelpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactHelpRoutingModule { }
