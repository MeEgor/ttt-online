import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { GameComponent } from './game.component'
import { NewGameComponent } from './new/new.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
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
