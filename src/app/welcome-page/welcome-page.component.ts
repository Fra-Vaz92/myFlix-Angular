import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * Component for displaying the welcome page.
 *
 * The `WelcomePageComponent` serves as the entry point for the application,
 * providing options for user registration and login by opening respective dialogs.
 */

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  
  
  ngOnInit(): void {
  }

   /**
   * Opens a dialog for user registration.
   *
   * This method triggers the opening of a modal dialog with the `UserRegistrationFormComponent`
   * where users can fill in their details for registration. The dialog has a fixed width of 400px.
   *
   * @returns {void} This method does not return any value.
   */
  
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '400px'
    });
  }
openUserLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      width: '400px'
    });
  }
}