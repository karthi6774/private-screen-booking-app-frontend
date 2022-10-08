import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-update-pending-payment',
  templateUrl: './update-pending-payment.component.html',
  styleUrls: ['./update-pending-payment.component.css']
})
export class UpdatePendingPaymentComponent implements OnInit {

  payupdateForm!: FormGroup;
  payStatus:boolean=false;

  seasons: boolean[] = [true, false];

  constructor(private fb:FormBuilder,
    private adminService:AdminService,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.payupdateForm = this.fb.group({
      orderId :['',[Validators.required]]
    });
  }

  update(form:FormGroup){
    this.adminService.updatePendingPayment(form.value.orderId,this.payStatus)
    .subscribe( res => {
      console.log(res);
      if(res){
        this.openSnackBar();
        this.payupdateForm.reset('');
      }
    })

  }

  openSnackBar(){
    this.snackBar.open('Updated Success','x',{
      duration : 5000,
      panelClass :'success-snackbar'
    });
  }

}
