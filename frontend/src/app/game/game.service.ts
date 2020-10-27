import { Injectable } from '@angular/core'
import * as ActionCable from 'actioncable'

@Injectable({
  providedIn: 'root'
})
export class GameActionCableService {
  private consumer: any

  constructor() {}

  subscribeMe(token: string, gameUuid: string) {
    this.consumer = ActionCable.createConsumer(`ws://localhost:3000/cable?access_token=${token}`)
    console.log("Trying connection")
    this.consumer.subscriptions.create({
      channel: "GameChannel",
      game: gameUuid
    }, {
      connected() {
        console.log("Subscription is ready for use")
      },
      disconnected() {
        console.log("Service terminated by WB server")
      },
      received(data) {
        console.log("This is the data received: ", data)
      }
    })
  }
}