import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { AuthComponent } from './auth.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    AuthComponent
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }
