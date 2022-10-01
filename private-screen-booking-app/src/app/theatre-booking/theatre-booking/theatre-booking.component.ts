import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { TheatreBookingService } from '../theatre-booking.service';
import { Theatre } from '../_interface/theatre';

@Component({
  selector: 'app-theatre-booking',
  templateUrl: './theatre-booking.component.html',
  styleUrls: ['./theatre-booking.component.css']
})
export class TheatreBookingComponent implements OnInit ,AfterViewInit {



  constructor(private theatreService:TheatreBookingService,
    private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  today : Date =  new Date();
  selectedDate: any;
  selectedTheatre : string='';
  selectedSlot:string='';
  removedTheatre : string='';

  price: number=0;
  seats: number= 0;
  hours: number = 0;

  availableTheatre : Theatre={
    isAfternoon: false,
    isEvening: false,
    isMorning: false,
    isNight: false,
    screenDate: '',
    theatreName: '',
    _id: '',
    price: 0,
    seats: 0,
    hours: 0
  };

  availableSlots :{
    morning:boolean,
    afternoon:boolean,
    evening:boolean,
    night:boolean
  }={
    morning: false,
    afternoon: false,
    evening: false,
    night: false
  }

 /*  dateSelector = new FormControl('',[

  ]); */

  selectedDateEvent(event:MatDatepickerInputEvent<Date> ){
    console.log(event.value);
    this.selectedDate = event.value;
    //this.selectedDate = new Date(2022,09,27);
   // this.selectedDate = this.selectedDate.toLocaleDateString().replaceAll('/','-');
   this.selectedDate = this.formatDate(this.selectedDate);
    console.log(this.selectedDate);
  }

  ngAfterViewInit(){
//console.log(this.theatrematcard);
  }

 padTo2Digits(num :number) {
    return num.toString().padStart(2, '0');
  }

  formatDate(date :Date) {
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-');
  }

  selectedTheatreEvent(theatreName : string){
    this.selectedDate = this.formatDate(this.selectedDate);
    console.log(theatreName);
    this.selectedTheatre =  theatreName;

    this.theatreService.availableSlots(this.selectedDate,this.selectedTheatre)
    .subscribe( res  => {
      console.log(res);
      this.availableTheatre =  res.theatre;
      console.log(this.availableTheatre);
      this.price = this.availableTheatre.price;
      this.hours = this.availableTheatre.hours;
      this.seats = this.availableTheatre.seats;
      this.availableSlots.morning = this.availableTheatre.isMorning;
      this.availableSlots.afternoon = this.availableTheatre.isAfternoon;
      this.availableSlots.evening = this.availableTheatre.isEvening;
      this.availableSlots.night = this.availableTheatre.isNight;
      console.log(this.availableSlots);
    });


  }

  slotSelectedEvent(slotName:string){
    this.selectedSlot = slotName;
  }

  checkoutPage(){
    console.log(this.selectedDate);
        this.router.navigateByUrl('/book-now/checkout',{state:[
          {
           selectedDate: this.selectedDate,
           selectedTheatre :this.selectedTheatre,
           selectedSlot : this.selectedSlot,
           price :this.price,
           hours:this.hours,
           seats :this.seats
          }
        ]} );
  }


}
