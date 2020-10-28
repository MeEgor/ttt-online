import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { GameComponent } from './game.component'
import { NewGameComponent } from './new/new.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    GameComponent,
    NewGameComponent
  ],
  exports: [
    GameComponent,
    NewGameComponent
  ]
})
export class GameModule { }
