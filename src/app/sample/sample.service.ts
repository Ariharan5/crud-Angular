import { Observable, map, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sample } from './sample';

@Injectable({
  providedIn: 'root',
})
export class SampleService {
  constructor(private http: HttpClient) {}
// url globly assigned
  url = 'http://localhost:3000/sample';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // get the data form the service 
  getService(): Observable<Sample[]> {
    return this.http.get<Sample[]>(this.url).pipe(
      map((result:Sample[]) => {
        return result;
      })
    );
  }
// Create the data from the service
  createService(id:any): Observable<Sample[]> {
    return this.http.post<Sample[]>(this.url, id).pipe(
      map((result:Sample[]) => {
        return result;
      })
    );
  }
// Updating the data from the service
  UpdateService(id: number, data: any): Observable<Sample[]> {
    return this.http.put<Sample[]>(this.url + '/' + `${id}`, data).pipe(
      map((result:Sample[]) => {
        return result;
      })
    );
  }
// deleteing the data from the service
  deleteService(id: number): Observable<Sample[]> {
    return this.http.delete<Sample[]>(this.url + '/' + `${id}`).pipe(
      map((result:Sample[]) => {
        return result;
      })
    );
  }


//   errorHandler(error) {
//     let errorMessage = '';
//     if(error.error instanceof ErrorEvent) {
//       errorMessage = error.error.message;
//     } else {
//       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     }
//     return throwError(errorMessage);
//  }


 
}
