import { Injectable } from '@angular/core';
import { UserDetails } from './types.d';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppStorageService {
  constructor(private router: Router) {}

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  getUserData(): UserDetails | null {
    const userDataFromStorage = localStorage.getItem('userData');
    if (userDataFromStorage) {
      return JSON.parse(userDataFromStorage);
    }
    return null;
  }

  getToken(): string {
    if (this.isLocalStorageAvailable()) {
      const token = localStorage.getItem('token');
      return token ? token : '';
    }
    return '';
  }

  isUserLoggedIn(): boolean {
    const token = this.getToken();
    return token ? true : false;
  }

  setUserData(userData: UserDetails): void {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  setToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('token', token);
    }
  }

  logoutUser(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.clear();
    }
    this.router.navigate(['/welcome']);
  }
}