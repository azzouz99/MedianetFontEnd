import { Component } from '@angular/core';
import { RegisterRequest } from "../../services/models/register-request";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/services/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerRequest: RegisterRequest = { email: '', firstname: '', lastname: '', password: '' };
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.errorMsg = [];
    this.authService.register({
      body: this.registerRequest
    })
      .subscribe({
        next: () => {
          this.router.navigate(['login']);
        },
        error: (err) => {
          console.log("Error response:", JSON.stringify(err, null, 2)); // Log the full error response
          if (err.error && Array.isArray(err.error.validationErrors)) {
            this.errorMsg = err.error.validationErrors;
          } else {
            this.errorMsg = ["An unexpected error occurred. Please try again later."];
          }
        }
      });
  }
}
