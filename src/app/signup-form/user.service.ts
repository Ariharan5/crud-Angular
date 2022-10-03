import { UsersListing } from './enitity';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Injection of HttpClient
  constructor(private http: HttpClient) {}

  // Url globaly assigning the url
  userUrl = 'http://localhost:8080/users';

  // service to Creating student details
  createUser(data: any): Observable<any> {
    return this.http.post(this.userUrl, data).pipe(
      map((result) => {
        return result;
      })
    );
  }

  //  service to Get the data
  getUser(): Observable<any> {
    return this.http.get(this.userUrl).pipe(
      map((result) => {
        return result;
      })
    );
  }

  // Service to Update the user data
  updateUser(id: number, data: any): Observable<any> {
    return this.http
      .put(`http://localhost:8080/users/${id}`, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // Service to delete the user data
  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.userUrl + '/' + `${id}`).pipe(
      map((result: any) => {
        return result;
      })
    );
  }



}
