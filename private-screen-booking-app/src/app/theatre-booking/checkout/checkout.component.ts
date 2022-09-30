import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TheatreBookingService } from '../theatre-booking.service';
import { Order } from '../_interface/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutForm: FormGroup = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(10),
      Validators.pattern("^[0-9]+$")]],
  });

  constructor(private fb: FormBuilder,private theatreService: TheatreBookingService) {}



  order:Order={
    fullName: '',
    email: '',
    phoneNumber: '',
    theatreName: '',
    screenDate: '',
    screenFromTime: new Date(),
    screenToTime: new Date(),
    price: 0,
    numberOfSeats: 0,
    slotName: ''
  }

  ngOnInit(): void {
   // console.log(history.state[0]);
    let temp = history.state[0];
    this.order.price = temp.price;
    this.order.slotName = temp.selectedSlot;
    this.order.theatreName = temp.selectedTheatre;
    this.order.numberOfSeats = temp.seats;
    //this.order.screenDate = temp.selectedDate.toLocaleDateString().replaceAll('/','-');
    this.order.screenDate = temp.selectedDate;
    console.log(this.order.screenDate);

    console.log(this.order);





  }

  onSubmit(form: FormGroup) {
/*     console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.fullName);
    console.log('Email', form.value.email);
    console.log('Message', form.value.phoneNumber); */
    this.order.fullName = form.value.fullName;
    this.order.email = form.value.email;
    this.order.phoneNumber = form.value.phoneNumber;

    console.log("confirmed order " + this.order.screenDate);

    this.theatreService.confirmedOrder(this.order)
    .subscribe( res => console.log(res));
  }




}
