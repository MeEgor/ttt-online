import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'
import { Observable } from 'rxjs'

export type State = "started"|"completed"

export interface GameState {
  uuid: string
  field: string[][]
  loading: boolean
  player1: number
  player2: number
  turn: number
  winner: number
  state: State
}

@Injectable()
export class GameStore extends ComponentStore<GameState> {

  readonly field$: Observable<string[][]> = this.select(state => state.field)
  readonly setField = this.updater((state, field: string[][]) => ({ ...state, field }))

  readonly loading$: Observable<boolean> = this.select(state => state.loading)
  readonly setLoading = this.updater((state, loading: boolean) => ({ ...state, loading }))
  
  readonly turn$: Observable<number> = this.select(state => state.turn)
  readonly players$: Observable<[number, number]> = this.select(state => ([
    state.player1,
    state.player2
  ]))

  readonly setUuid = this.updater((state, uuid: string) => ({ ...state, uuid}))
  readonly gameCompleted$ = this.select(state => state.state == "completed")
  readonly winner$ = this.select(state => state.winner)
  readonly isDraw$ = this.select(
    this.gameCompleted$,
    this.winner$,
    (gameCompleted, winner) => gameCompleted && !winner
  )

  constructor() {
    super({ 
      uuid: null,
      loading: true,
      field: [],
      player1: null,
      player2: null,
      winner: null,
      turn: null,
      state: null
    })
  }
}