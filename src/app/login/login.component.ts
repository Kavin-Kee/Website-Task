import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  /**
   * Stores the username entered by the user.
   */
  uname: string = '';

  /**
   * Stores the password entered by the user.
   */
  password: string = '';

  /**
   * Boolean flag to toggle the visibility of the password field.
   */
  isShowPassword: boolean = false;

  /**
   * Stores the actual username after login (if necessary).
   */
  username: string = '';

  constructor(
    private task: TaskService, 
    private router: Router, 
    private snackBar: MatSnackBar
  ) { }

 

  /**
   * Handles the login form submission.
   * - Fetches user data using the `login()` method from `TaskService`.
   * - Verifies if the entered username and password match any user from the API response.
   * - If valid credentials are provided, the user is logged in, a success message is shown, and the user is redirected to the dashboard.
   * - If invalid credentials are provided, an error message is displayed.
   * 
   *  loginForm - Reference to the form being submitted.
   */
  onSubmit(loginForm: any) {
    if (this.uname && this.password) {
      this.task.login().subscribe(
        response => {
          const user = response.find((user: any) =>
            user.name === this.uname && user.confirmPassword === this.password
          );

          if (user) {
            this.task.setUserInfo(user); // Sets user information for the session
            this.snackBar.open('Login Success!', 'Close', {
              duration: 3000, // Shows success message for 3 seconds
            });
            this.router.navigate(['/dashboard']); // Navigates to the dashboard upon successful login
          } else {
            this.snackBar.open('Invalid Username or Password', '', {
              duration: 3000, // Displays an error message if login fails
            });
          }
        },
        error => {
          console.error('Error', error); // Logs errors to the console
        }
      );
    }
  }

  /**
   * Toggles the visibility of the password field between plain text and masked password.
   */
  togglePasswordVisibility(): void {
    this.isShowPassword = !this.isShowPassword;
  }

  /**
   * Determines the input field type for the password.
   * - If `isShowPassword` is `true`, the type will be `text`.
   * - If `isShowPassword` is `false`, the type will be `password`.
   * 
   * returns - The type of the password input field.
   */
  get passwordFieldType(): string {
    return this.isShowPassword ? 'text' : 'password';
  }
}
