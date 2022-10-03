import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Student } from '../Student';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  // Injection oof httpClient
  constructor(private http: HttpClient) {}
  studenturl = 'http://localhost:3000/Studentdetails';

  // Creating student details
  createStudent(data: any): Observable<Student[]> {
    return this.http.post<Student[]>(this.studenturl, data).pipe(
      map((result) => {
        return result;
      })
    );
  }

  // Get the student details
  getStudenet(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studenturl).pipe(
      map((result) => {
        return result;
      })
    );
  }

  // Update the student details
  updatedata(id: number, data: any): Observable<Student[]> {
    return this.http
      .put<Student[]>(this.studenturl + '/' + `${id}`, data)
      .pipe(
        map((reslt) => {
          return reslt;
        })
      );
  }


  //Removing the data student details
  removedata(id: number): Observable<Student[]> {
    return this.http.delete<Student[]>(this.studenturl + '/' + `${id}`).pipe(
      map((result) => {
        return result;
      })
    );
  }
}
