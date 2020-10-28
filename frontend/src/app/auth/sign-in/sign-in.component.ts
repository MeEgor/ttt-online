import { Component, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { AngularTokenService, ApiResponse, SignInData } from 'angular-token'

@Component({
  selector: 'app-sign-in',
  templateUrl: 'sign-in.component.html',
})
export class SignInComponent {
  @ViewChild('signInForm', { static: true }) signInForm: NgForm

  signInData: SignInData = <SignInData>{}
  loading = false
  errors: string[]

  constructor(
    private tokenService: AngularTokenService,
    private router: Router
  ) { }

  onSubmit() {
    this.loading = true
    this.errors = null

    this.tokenService.signIn(this.signInData).subscribe(
      res => {
        this.loading = false
        let redirectUrl = localStorage.getItem('redirectTo')
        if (!redirectUrl) {
          redirectUrl = "/game/new"
        }
        this.router.navigateByUrl(redirectUrl)
      }, 
      error => {
        this.loading = false
        
        if (error.status == 401) {
          this.errors = error.error.errors
        } else {
          this.errors = ["Unknown error"]
        }

        this.signInForm.resetForm()
      }
    )
  }

  closeNotification() {
    this.errors = null
  }
}
