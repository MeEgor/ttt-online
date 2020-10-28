import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AngularTokenService } from 'angular-token'
import { AuthGuard } from './auth/auth.guard'
import { RegisterComponent } from './auth/register/register.component'
import { SignInComponent } from './auth/sign-in/sign-in.component'
import { GameComponent } from './game/game.component'
import { NewGameComponent } from './game/new/new.component'


const routerConfig: Routes = [
  { 
    path: 'sign-in', 
    component: SignInComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'register', 
    component: RegisterComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'game/new', 
    component: NewGameComponent, 
    canActivate: [AngularTokenService]
  },
  { 
    path: 'game/:uuid', 
    component: GameComponent, 
    canActivate: [AngularTokenService] 
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
