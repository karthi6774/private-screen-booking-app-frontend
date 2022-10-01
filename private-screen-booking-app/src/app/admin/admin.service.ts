import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiUrl = environment.apiURL ;

  constructor(private http:HttpClient) { }


  login(username:string,password:string):Observable<any>{
    return this.http.post<any>(this.apiUrl + '/auth/login',{"username" : username, "password":password}).
    pipe(catchError(this.handleError<any>(`login`)));
  }

  pendingPayments(){
    return this.http.get(this.apiUrl+'/auth/pending-payments')
    .pipe(catchError(this.handleError<any>(`get pending payments`)))
  }

  updatePendingPayment(orderId:string,paymentStatus:boolean){
    return this.http.put(this.apiUrl + '/auth/pending-payment-status ' ,
    {"orderId" : orderId,"paymentStatus":paymentStatus})
    .pipe(catchError(this.handleError<any>(`update pending payment`)));
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


}
