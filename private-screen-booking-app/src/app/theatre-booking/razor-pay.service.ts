import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, delay, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from './_interface/order';

@Injectable({
  providedIn: 'root'
})
export class RazorPayService {

  apiUrl = environment.apiURL;

  constructor(private http:HttpClient,private snackBar:MatSnackBar) { }

  createRazorPayOrder(data:Order):Observable<any>{
    console.log(data);
    return this.http.post<any>(this.apiUrl + '/book-now/createPaymentOrder',data)
    .pipe(catchError(this.handleError<any>('confirming the razor pay order')));
  }

  verfiyPaymentSignature(data:
    {razorpay_order_id:string,razorpay_payment_id:string,razorpay_signature:string}):Observable<any>{
    console.log(data);
    return this.http.post<any>(this.apiUrl + '/book-now/verifyPaymentSign',data)
    .pipe(catchError(this.handleError<any>('verifying payment sign')));
  }

 paymentUnsuccessfull(data:Order):Observable<any>{
    console.log(data);
    return this.http.post<any>(this.apiUrl + '/book-now/unsuccessfullPayment',data)
    .pipe(catchError(this.handleError<any>('unsuccessfull payment')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      this.openSnackBar(error.message);
      return of(result as T);
    };
  }

  private openSnackBar(message :string){
    this.snackBar.open("Error occured while \n "  + message,'X',{
      duration : 5000,
      panelClass :'failure-snackbar'
    });
}
}
