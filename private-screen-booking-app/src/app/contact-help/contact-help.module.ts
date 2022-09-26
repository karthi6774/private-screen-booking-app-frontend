import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactHelpRoutingModule } from './contact-help-routing.module';
import { ContactHelpComponent } from './contact-help/contact-help.component';


@NgModule({
  declarations: [
    ContactHelpComponent
  ],
  imports: [
    CommonModule,
    ContactHelpRoutingModule
  ]
})
export class ContactHelpModule { }
