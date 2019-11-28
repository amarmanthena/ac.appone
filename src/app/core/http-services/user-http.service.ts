import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserDto } from '../models';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  private readonly usersUrl = `http://localhost:3000/usersdata`;

  constructor(
    protected httpClient: HttpClient
  ) { }

  public getUsers(): Observable<UserDto[]> {
    return this.httpClient.get<UserDto[]>(this.usersUrl).pipe(
         catchError(this.handleError)
       );
  }

  public getUserById(id: number): Observable<UserDto> {
    const url = `${this.usersUrl}/${id}`;
    return this.httpClient.get<UserDto>(url).pipe(
      catchError(this.handleError)
    );
  }

  public addUser(user: UserDto): Observable<UserDto> {
    return this.httpClient.post<UserDto>(this.usersUrl, user, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public deleteuser(id: number): Observable<UserDto> {
    const url = `${this.usersUrl}/${id}`;

    return this.httpClient.delete<UserDto>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public updateUser(user: UserDto): Observable<null | UserDto> {
    const url = `${this.usersUrl}/${user.id}`;

    return this.httpClient.put<UserDto>(url, user, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

}
