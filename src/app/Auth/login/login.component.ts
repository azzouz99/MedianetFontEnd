import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../services/models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import {TokenService} from "../../services/services/token/token.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  authRequest: AuthenticationRequest ={email: '',password:''};
  errorMsg: Array<string> = [];
  constructor(
    private router: Router,
    private authService :AuthenticationService,
    private tokenService: TokenService,
    private snackBar: MatSnackBar,
  ){ }
  register() {
    this.router.navigate(['register']);
    }
    login() {
    this.errorMsg=[];
    this.authService.authenticate(
      {

      body: this.authRequest
    }).subscribe({
      next:(res)=>{
        this.tokenService.token=res.token as string;



        this.router.navigate(['']);
        this.showSuccessPopup('Login successfully');

      },

      error:(err)=>{
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.errorMsg);
        }
      }
    });
    }
  showSuccessPopup(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
    });
  }

}
