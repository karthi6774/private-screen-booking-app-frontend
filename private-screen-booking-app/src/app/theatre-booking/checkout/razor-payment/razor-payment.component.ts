import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { environment } from 'src/environments/environment';
import { RazorPayService } from '../../razor-pay.service';
import { WindowRefService } from '../../window-ref.service';
import { Order } from '../../_interface/order';


@Component({
  selector: 'app-razor-payment',
  templateUrl: './razor-payment.component.html',
  styleUrls: ['./razor-payment.component.css'],
  providers: [WindowRefService]
})
export class RazorPaymentComponent implements OnInit ,OnChanges {

  @Input() toDisable:boolean=true;
  @Input() formData :any;
  @Input() isManualPayClicked:boolean = false;

  @Output() isRazorPayClicked = new EventEmitter<Boolean>();

  confirmedOrder :Order ={
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

  isloading:boolean = false;

  userData :any;

  constructor(private winRef: WindowRefService,private razorPayService:RazorPayService,
    private snackBar: MatSnackBar,
    private router:Router) { }
  ngOnChanges(changes: SimpleChanges): void {

   // let toDisable  = changes['toDisable'].currentValue;
   if(changes['formData']){
    this.userData = changes['formData'].currentValue;
   }


  }

  ngOnInit(): void {
    //console.log('razor pay comp init')
  }

  payWithRazorPay(){
    this.isRazorPayClicked.emit(true);
    if(this.isManualPayClicked){
      return;
    }
    if(localStorage.getItem('order') !== null){
      this.confirmedOrder  = JSON.parse(localStorage.getItem('order') as string);
    }

    this.confirmedOrder.fullName = this.userData.fullName;
    this.confirmedOrder.email = this.userData.email;
    this.confirmedOrder.phoneNumber = this.userData.phoneNumber;

    console.log("confirmed order " + this.confirmedOrder.screenDate);
    this.isloading = true;
    this.razorPayService.createRazorPayOrder(this.confirmedOrder)
    .subscribe( res => {
      this.isloading = false;
      console.log(res);
      if(res){
        this.startRazorPayProcess(res);
      }
    })
  }

  startRazorPayProcess(data:any){
    const options: any = {
      key: environment.RazorPayKey,
      amount: data.order.price, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: '', // company name or product name
      description: '',  // product description
     // image: './assets/logo.png', // company logo or product image
      order_id: data.order.razorPayOrderId, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#0c238a'
      }
    };
    options.handler = ((response :any , error:any) => {
      options.response = response;
      console.log(response);
      console.log(options);
      // call your backend api to verify payment signature & capture transaction
      this.isloading = true;
      this.razorPayService.verfiyPaymentSignature(
        {razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id : response.razorpay_payment_id,
        razorpay_signature : response.razorpay_signature
        }).subscribe( res => {
          this.isloading = false;
          console.log("payment status "  + res.message);
          this.openSnackBar('Order and payment Success \n check your mail for order details');
        if(res){
          this.openSnackBar('Order and payment Success \n check your mail for order details');
        }
        else{
          this.openSnackBar('invalid payment detected')
        }
        localStorage.removeItem('order');
        this.router.navigate(['home']);
        });
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      this.isloading = true;
      this.razorPayService.paymentUnsuccessfull(this.confirmedOrder)
      .subscribe(res => {
        this.isloading = false;
        console.log(res);
        this.openSnackBar('Transaction cancelled.')
      })
      console.log('Transaction cancelled.');
      localStorage.removeItem('order');
      this.router.navigate(['home']);

    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }


/*   openConfirmationDialog(email:string,orderId:string){
    this.dialog.open(AlertDialogComponent,{
      data:{
        email: email,
        orderId: orderId
      },
      width: '360px',
      height: '290px'
    });
  } */

  openSnackBar(message : string){
    this.snackBar.open(message,'x',{
      duration : 50000,
      panelClass :'success-snackbar'
    });
  }

}
