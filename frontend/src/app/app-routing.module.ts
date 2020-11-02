import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AngularTokenService } from 'angular-token'
import { PageNotFoundComponent } from './404.component'
import { AuthGuard } from './auth/auth.guard'
import { RegisterComponent } from './auth/register/register.component'
import { SignInComponent } from './auth/sign-in/sign-in.component'
import { GameComponent } from './game/game.component'
import { GameGuard } from './game/game.guard'
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
    canActivate: [GameGuard]
  },
  { 
    path: 'game/:uuid', 
    component: GameComponent, 
    canActivate: [GameGuard] 
  },
  { 
    path: '',   
    redirectTo: '/game/new', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    component: PageNotFoundComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
