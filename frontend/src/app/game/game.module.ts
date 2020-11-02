import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { GameComponent } from './game.component'
import { NewGameComponent } from './new/new.component'
import { ReactiveFormsModule } from '@angular/forms'
import { ReactiveComponentModule } from '@ngrx/component'
import { GameFieldComponent } from './field.component'
import { GameGuard } from './game.guard'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ReactiveComponentModule
  ],
  declarations: [
    GameComponent,
    NewGameComponent,
    GameFieldComponent
  ],
  exports: [
    GameComponent,
    NewGameComponent,
    GameFieldComponent
  ],
  providers: [
    GameGuard
  ]
})
export class GameModule { }
