import { Injectable } from '@angular/core'
import * as ActionCable from 'actioncable'
import { Subject } from 'rxjs'
import { GameState } from './game.store'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameWsService {
  private consumer: any
  private gameChannel: any
  private gameUuid: string

  private _recived = new Subject<GameState>()
  readonly recived$ = this._recived.asObservable()
  private readonly cableHost = environment.cableHost

  constructor() {}

  subscribeMe(params: {
    accessToken: string, 
    uid: string, 
    client: string, 
    gameUuid: string
  }) {
    const { gameUuid, accessToken, uid, client } = params
    const subject = this._recived

    this.gameUuid = gameUuid
    this.consumer = ActionCable.createConsumer(`
      ${this.cableHost}/cable?access_token=${accessToken}&uid=${uid}&client=${client}`
    )

    console.log("Trying connection")

    this.gameChannel = this.consumer.subscriptions.create({
      channel: "GameChannel",
      game: gameUuid
    }, {
      connected() {
        console.log("Subscription is ready for use")
        this.perform("join")
      },
      disconnected() {
        console.log("Service terminated by WB server")
      },
      received(data: GameState) {
        console.log("This is the data received: ", data)
        subject.next(data)
      }
    })
  }

  move(top: number, left: number) {
    this.gameChannel.perform("move", {
      top, left
    })
  }

  // join() {
  //   this.gameChannel.perform("join")
  // }
}