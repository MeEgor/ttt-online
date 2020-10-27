import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AngularTokenService } from 'angular-token'
import { AuthComponent } from './auth/auth.component'
import { GameComponent } from './game/game.component'


const routerConfig: Routes = [
  { 
    path: '', 
    component: AuthComponent 
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
