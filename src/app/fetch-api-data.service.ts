import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// API URL for the client app
const apiUrl = 'https://movie-app-47zy.onrender.com/';

// Utility methods for localStorage access
const getToken = (): string | null => (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
const getUserData = (): any => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

// Shared error handler
const formatError = (error: HttpErrorResponse): any => {
  console.error('Error occurred:', error);
  return throwError('Something went wrong; please try again later.');
};

// User Registration Service
@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  constructor(private http: HttpClient) {}

  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users/register', userDetails).pipe(catchError(formatError));
  }
}

// User Login Service
@Injectable({
  providedIn: 'root',
})
export class UserLoginService {
  constructor(private http: HttpClient) {}

  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(catchError(formatError));
  }
}

// Get All Movies Service
@Injectable({
  providedIn: 'root',
})
export class GetAllMoviesService {
  constructor(private http: HttpClient) {}

  public getAllMovies(): Observable<any> {
    const token = getToken();
    if (!token) return throwError('User is not authenticated.');
    return this.http
      .get<any[]>(`${apiUrl}movies`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map((res) => res || {}), catchError(formatError));
  }
}

// Add To Favorites Service
@Injectable({
  providedIn: 'root',
})
export class AddToFavoritesService {
  constructor(private http: HttpClient) {}

  public addToFavorites(movieId: string): Observable<any> {
    const token = getToken();
    const user = getUserData();
    const username = user?.Username;
    if (!token || !username) return throwError('User is not authenticated.');
    return this.http
      .post(
        `${apiUrl}users/${username}/favorites`,
        { movieId },
        {
          headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
        }
      )
      .pipe(catchError(formatError));
  }
}

// Get User Data Service
@Injectable({
  providedIn: 'root',
})
export class GetUserDataService {
  constructor(private http: HttpClient) {}

  public getUserData(): Observable<any> {
    const token = getToken();
    const user = getUserData();
    const username = user?.Username;
    if (!token || !username) return throwError('User is not authenticated.');
    return this.http
      .get(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(formatError));
  }
}

// Remove From Favorites Service
@Injectable({
  providedIn: 'root',
})
export class RemoveFromFavoritesService {
  constructor(private http: HttpClient) {}

  public removeFromFavorites(movieId: string): Observable<any> {
    const token = getToken();
    const user = getUserData();
    const username = user?.Username;
    if (!token || !username) return throwError('User is not authenticated.');
    return this.http
      .delete(`${apiUrl}users/${username}/movies/${movieId}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(formatError));
  }
}

// Delete User Service
@Injectable({
  providedIn: 'root',
})
export class DeleteUserService {
  constructor(private http: HttpClient) {}

  public deleteUser(): Observable<any> {
    const token = getToken();
    const user = getUserData();
    const username = user?.Username;
    if (!token || !username) return throwError('User is not authenticated.');
    return this.http
      .delete(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(catchError(formatError));
  }
}


@Injectable({
  providedIn: 'root',
})
export class EditUserService {
  constructor(private http: HttpClient) {}

  //Api call to edit user data
  public editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .put(apiUrl + `users/${username}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
