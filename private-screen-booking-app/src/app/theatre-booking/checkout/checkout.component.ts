import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
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

  constructor(private fb: FormBuilder,
    private theatreService: TheatreBookingService,
    private router:Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    ) {}

isloading:boolean=false;

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

  confirmedOrder:Order ={
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
   //console.log(history.state[0]);
    let temp = history.state[0];
    if(localStorage.getItem('order') === null && temp === undefined){
      this.router.navigate(['/home']);
    }
    if(temp !== undefined){
      this.order.price = temp.price;
      this.order.slotName = temp.selectedSlot;
      this.order.theatreName = temp.selectedTheatre;
      this.order.numberOfSeats = temp.seats;
      //this.order.screenDate = temp.selectedDate.toLocaleDateString().replaceAll('/','-');
      this.order.screenDate = temp.selectedDate;
      localStorage.setItem('order',JSON.stringify(this.order));
      console.log(this.order.screenDate);

      console.log(this.order);
    }

    if(localStorage.getItem('order') !== null){
      this.order  = JSON.parse(localStorage.getItem('order') as string);
    }







  }

  onSubmit(form: FormGroup) {
/*     console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.fullName);
    console.log('Email', form.value.email);
    console.log('Message', form.value.phoneNumber); */
    if(localStorage.getItem('order') !== null){
      this.confirmedOrder  = JSON.parse(localStorage.getItem('order') as string);
    }

    this.confirmedOrder.fullName = form.value.fullName;
    this.confirmedOrder.email = form.value.email;
    this.confirmedOrder.phoneNumber = form.value.phoneNumber;

    console.log("confirmed order " + this.confirmedOrder.screenDate);
    this.isloading = true;
    this.theatreService.confirmedOrder(this.confirmedOrder)
    .subscribe( res => {
      console.log(res);
      this.isloading = false;
      if(res){
        this.openSnackBar();
        this.openConfirmationDialog(res.order.email,res.order._id);
      }
      localStorage.removeItem('order');
      this.router.navigate(['home']);


    });
  }

  openConfirmationDialog(email:string,orderId:string){
    this.dialog.open(AlertDialogComponent,{
      data:{
        email: email,
        orderId: orderId
      },
      width: '360px',
      height: '290px'
    });
  }

  openSnackBar(){
    this.snackBar.open('Order Success','x',{
      duration : 5000,
      panelClass :'success-snackbar'
    });
  }




}
