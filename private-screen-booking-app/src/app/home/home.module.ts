import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ContactUsComponent } from './contact-us/contact-us.component';


@NgModule({
  declarations: [
    ImageSliderComponent,
    ReviewsComponent,
    ContactUsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  exports : [
    ImageSliderComponent,
    ReviewsComponent,
    ContactUsComponent
  ]
})
export class HomeModule { }
