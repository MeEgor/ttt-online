import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { SignInComponent } from './sign-in/sign-in.component'
import { RegisterComponent } from './register/register.component'
import { AuthGuard } from "./auth.guard"

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    SignInComponent,
    RegisterComponent
  ],
  exports: [
    SignInComponent,
    RegisterComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class AuthModule { }
