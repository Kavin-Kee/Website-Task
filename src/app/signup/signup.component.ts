import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  /**
   * The form group for handling signup form data.
   */
  signupForm: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private task: TaskService,
    private snackBar: MatSnackBar,
    private route: Router
  ) { }

  /**
   * Angular lifecycle hook `ngOnInit` that is triggered after the component has been initialized.
   * 
   * - Initializes the `signupForm` with form controls for name, email, age, phone number, city, state, country, createPassword, confirmPassword.
   * - Uses FormArray to handle dynamic fields for multiple addresses.
   * - Includes custom validation to check if `createPassword` and `confirmPassword` match.
   */
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      createPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],

      // FormArray to hold multiple address controls
      addresses: this.fb.array([this.createAddress()])

    }, { validator: this.passwordMatchValidator });
  }

  /**
   * Custom validator to check if `createPassword` and `confirmPassword` match.
   * 
   * param formGroup - The FormGroup that contains the password fields.
   * returns `null` if passwords match, otherwise returns an object with a `mismatch` error.
   */
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('createPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    const errors = password && confirmPassword && password !== confirmPassword
      ? { mustMatch: true }
      : null;
    return errors;
  }


  /**
   * Creates a new form group for addresses within the FormArray.
   * 
   * returns A FormGroup with controls for `street` and `pincode`, both of which are required fields.
   */
  createAddress(): FormGroup {
    return this.fb.group({
      street: ['', Validators.required],
      pincode: ['', Validators.required]
    });
  }

  /**
   * Getter to retrieve the addresses form array from the `signupForm`.
   * 
   * returns The `FormArray` of address form groups.
   */
  get addresses() {
    return this.signupForm.get('addresses') as FormArray;
  }

  /**
   * Adds a new address form group to the `addresses` FormArray.
   */
  addAddress() {
    this.addresses.push(this.createAddress());
  }

  /**
   * Removes an address form group from the `addresses` FormArray by index.
   * 
   * param index - The index of the address form group to be removed.
   */
  removeAddress(index: number) {
    this.addresses.removeAt(index);
  }

  /**
   * Handles the form submission when the user submits the signup form.
   * 
   * - If the form is invalid, all controls are marked as touched to display validation errors.
   * - If the form is valid, it calls the `submitForm` method from the `TaskService` and send the data and displays a success message.
   * - On successful form submission, the user is redirected to the login page.
   */
  onSubmit() {
    if (this.signupForm.invalid) {
      // Mark all controls as touched to show validation errors
      this.signupForm.markAllAsTouched();
      return;
    } else {
      this.task.submitForm(this.signupForm.value).subscribe(res => {
        this.snackBar.open('You Joined With US!', 'Close', {
          duration: 3000,
        });
        this.route.navigate(['/login']);
      });
    }
  }
}
