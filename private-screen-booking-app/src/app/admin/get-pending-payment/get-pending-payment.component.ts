import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/theatre-booking/_interface/order';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-get-pending-payment',
  templateUrl: './get-pending-payment.component.html',
  styleUrls: ['./get-pending-payment.component.css']
})
export class GetPendingPaymentComponent implements OnInit {

  pendingPaymentOrders : any[]=[];

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
      this.adminService.pendingPayments().subscribe(res => {
        this.pendingPaymentOrders = res.pendingPaymentsOrder;
        console.log(this.pendingPaymentOrders);
      })
  }

}
