import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private task: TaskService, private route: Router, private snack: MatSnackBar) { }
  
  /**
   * Holds the name of the currently logged-in user, fetched from the API.
   */
  userName: string | null = null;

  /**
   * - Fetches user information using the `getUserInfo()` method from `TaskService`.
   * - Sets the `userName` property with the user's name or sets it to `null` if no user is found.
   */
  ngOnInit(): void {
    this.task.getUserInfo().subscribe(user => {
      this.userName = user ? user.name : null;
    });
  }

  /**
   * Handles the logout functionality.
   * - Navigates the user to the login page.
   * - Shows a success message using Angular Material's `MatSnackBar` component.
   */
  logout() {
    this.route.navigate(['/login']); // Redirects to the login page
    this.snack.open('Logout Success!', 'Close', {
      duration: 2000, // Display the snackbar for 2 seconds
    });
  }
}
