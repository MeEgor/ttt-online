import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularTokenService, ApiResponse, SignInData } from 'angular-token';

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.sass']
})
export class AuthComponent {
  @ViewChild('signInForm', { static: true }) signInForm: NgForm

  signInData: SignInData = <SignInData>{};
  output: ApiResponse

  constructor(
    private tokenService: AngularTokenService
  ) { }

  // Submit Data to Backend
  onSubmit() {

    this.output = null;

    this.tokenService.signIn(this.signInData).subscribe(
      res => {
        this.output = res;
        this.signInForm.resetForm();
      }, error => {
        this.output = error;
        this.signInForm.resetForm();
      }
    );
  }
}
