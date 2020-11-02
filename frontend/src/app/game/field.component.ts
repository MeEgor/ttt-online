import { Component } from '@angular/core'
import { AngularTokenService } from 'angular-token'
import { map, switchMap } from 'rxjs/operators'
import { GameWsService } from './game-ws.service'
import { GameStore } from './game.store'

@Component({
  selector: 'game-field',
  styleUrls: ["./fied.component.sass"],
  templateUrl: "./field.component.html"
})
export class GameFieldComponent {
  constructor(
    private gameStore: GameStore,
    private gameService: GameWsService,
    private tokenService: AngularTokenService
  ) {
    this.gameService.recived$.subscribe(gameState => {
      this.gameStore.setState(gameState)
    })
  }

  readonly field$ = this.gameStore.field$
  readonly turn$ = this.gameStore.turn$
  readonly gameCompleted$ = this.gameStore.gameCompleted$
  readonly players$ = this.gameStore.players$
  readonly isPlayer$ = this.players$.pipe(
    switchMap(players => this.tokenService.userData.pipe(map(data => players.indexOf(data.id) != -1)))
  )
  readonly yourTurn$ = this.turn$.pipe(map(currentTurn => {
    return this.tokenService.currentUserData.id == currentTurn
  }))
  readonly waitingPlayers$ = this.players$.pipe(map(([p1, p2]) => !p1 || !p2))
  readonly winner$ = this.gameStore.winner$
  readonly isWinner$ = this.winner$.pipe(map(winner => this.tokenService.currentUserData.id == winner))
  readonly isDraw$ = this.gameStore.isDraw$
  
  select(top: number, left: number, cell: string) {
    if (cell == null) {
      console.log(top, left)
      this.gameService.move(top, left)
    }
  }
}
