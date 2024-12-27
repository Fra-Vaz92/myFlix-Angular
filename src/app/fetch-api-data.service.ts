import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-app-47zy.onrender.com/';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  //get the token
  private getStoredToken(): any {
    return localStorage.getItem('token');
  }
  
  //get user information
  private getStoredUser(): any {
    return localStorage.getItem('user');
  }

  // Making the api call for the user registration
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }
  // User login 
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Get all movies
  public getAllMovies(): Observable<any> {
    const token = this.getStoredToken();
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  // Get specific movie
  public getMovie(title: string): Observable<any> {
    const token = this.getStoredToken();
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get director info
  public getDirector(name: string) {
    const token = this.getStoredToken();
    return this.http.get(apiUrl + 'movies/director/' + name, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get genre info
  public getGenre(name: string) {
    const token = this.getStoredToken();
    return this.http.get(apiUrl + 'movies/genre/' + name, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get all users
  public getAllUses() {
    const token = this.getStoredToken();
    return this.http.get(apiUrl + 'users', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Add a movie to favourite Movies list
  public addUserFavoriteMovie(movieId: string) {
    const token = this.getStoredToken();
    let user = this.getStoredUser();
    return this.http.put(apiUrl + 'users/' + user.username + '/favorite/' + movieId, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Delete a movie from favourite Movies list
  public deleteUserFavoriteMovie(movieId: string) {
    const token = this.getStoredToken();
    let user = this.getStoredUser();
    return this.http.delete(apiUrl + 'users/' + user.username + '/favorite/' + movieId, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Edit user info
  public editUser(userDetails: any): Observable<any> {
    const token = this.getStoredToken();
    let user = this.getStoredUser();
    return this.http.put(apiUrl + 'users/' + user.username, userDetails, {
      headers: new HttpHeaders(
        {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + token
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Delete user
  public deleteUser(userDetails: any): Observable<any> {
    const token = this.getStoredToken();
    let user = this.getStoredUser();
    return this.http.delete(apiUrl + 'users/' + user.username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  // Non-typed response
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}