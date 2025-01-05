import { Component } from '@angular/core';
import {RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-root',
  imports: [RouterModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';


  constructor(public router: Router) {}

  logout(): void {
    localStorage.clear();

    this.router.navigate(['welcome']);
  }
}