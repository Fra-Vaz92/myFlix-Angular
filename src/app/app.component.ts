import { Component } from '@angular/core';
import {NavigationEnd, RouterModule, Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppNavComponent } from './app-nav/app-nav.component';
import { AppStorageService } from './app-storage.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [RouterModule, MatToolbarModule, RouterOutlet, AppNavComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isUserLoggedIn = false;

  constructor(public appStorage: AppStorageService, public router: Router) {
    router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((event) => {
        console.log('Route Changed', event);
        this.getUserLoginStatus();
      });
  }

  getUserLoginStatus() {
    this.isUserLoggedIn = this.appStorage.isUserLoggedIn();
  }
}