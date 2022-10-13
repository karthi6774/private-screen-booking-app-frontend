import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, delay, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from './_interface/order';



@Injectable({
  providedIn: 'root'
})
export class TheatreBookingService {

  apiUrl = environment.apiURL;

  constructor(private http:HttpClient,private snackBar:MatSnackBar) { }


  availableSlots(selectedDate:string,selectedTheatre:string):Observable<any>{
    return this.http.get<any>(this.apiUrl + '/book-now/available-slots',
            {params : new HttpParams().set('theatreName',selectedTheatre)
                              .set('screenDate',selectedDate)
    }).
    pipe(catchError(this.handleError<any>(`available theatres`)));
  }

  confirmedOrder(data:Order):Observable<any>{
    console.log(data.screenDate);
    return this.http.post<any>(this.apiUrl + '/book-now/order',data)
    .pipe(catchError(this.handleError<any>('confirming the order')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      this.openSnackBar();
      return of(result as T);
    };
  }

  private openSnackBar(){
    this.snackBar.open('An Error Occured while confirming the order \n .Please try again','x',{
      duration : 50000,
      panelClass :'failure-snackbar'
    });
}
}
