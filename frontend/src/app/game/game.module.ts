import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { GameComponent } from './game.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    GameComponent
  ],
  exports: [
    GameComponent
  ]
})
export class GameModule { }
