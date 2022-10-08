import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatCalendarCellCssClasses, MatDatepickerInputEvent } from '@angular/material/datepicker';
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
    this.route.queryParams.subscribe( res => {
      if(res['theatre'] !== undefined){
        this.highlatedTheatre = res['theatre'];
      }
      else{
        this.highlatedTheatre = '';
      }
      console.log(this.highlatedTheatre);
    })
  }

  today : Date =  new Date();
  selectedDate: any;
  selectedTheatre : string='';
  selectedSlot:string='';
  highlatedTheatre : string='';

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

  isloading:boolean = false;

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



  selectedDateEvent(event:any ){
    console.log(event);
    this.selectedDate = event;
    //this.selectedDate = new Date(2022,09,27);
   // this.selectedDate = this.selectedDate.toLocaleDateString().replaceAll('/','-');
   this.selectedDate = this.formatDate(this.selectedDate);
    console.log(this.selectedDate);
    this.selectedTheatre='';
    this.selectedTheatreEvent('');
    this.availableSlots.afternoon = false;
    this.availableSlots.morning = false;
    this.availableSlots.evening = false;
    this.availableSlots.night = false;
    console.log(this.highlatedTheatre)
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
   // this.selectedDate = this.formatDate(this.selectedDate);
    console.log(theatreName);
    this.selectedTheatre =  theatreName;

    if( this.selectedTheatre !== ''){
      this.router.navigate(['/book-now'],{
        queryParams : { "theatre" : theatreName },
        skipLocationChange : false,
        queryParamsHandling : 'merge'
      })

      this.isloading = true;
      this.theatreService.availableSlots(this.selectedDate,this.selectedTheatre)
      .subscribe( res  => {
        console.log(res);
        this.isloading = false;
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
    else{
      this.router.navigate(['/book-now']);
    }






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
