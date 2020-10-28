import { Component, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { AngularTokenService, ApiResponse, RegisterData } from 'angular-token'

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
})
export class RegisterComponent {
  @ViewChild('registerForm', { static: true }) registerForm: NgForm

  registerData: RegisterData = <RegisterData>{}
  loading = false
  errors: string[]

  constructor(
    private tokenService: AngularTokenService,
    private router: Router
  ) { }

  onSubmit() {
    this.loading = true
    this.errors = null

    this.tokenService.registerAccount(this.registerData).subscribe(
      res => {
        this.loading = false
        let redirectUrl = localStorage.getItem('redirectTo')
        if (!redirectUrl) {
          redirectUrl = "/game/new"
        }
        this.router.navigateByUrl(redirectUrl)
      }, error => {
        this.loading = false

        if (error.status == 422) {
          this.errors = error.error.errors.full_messages
        } else {
          this.errors = ["Unknown error"]
        }

        this.registerForm.resetForm()
      }
    )
  }

  closeNotification() {
    this.errors = null
  }
}
