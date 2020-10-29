import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameWsService } from './game-ws.service'

@Component({
  selector: 'app-game',
  templateUrl: 'game.component.html',
  styleUrls: ['game.component.sass']
})
export class GameComponent {
  constructor(
    private gameCable: GameWsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const gameUuid = params["uuid"]
      this.gameCable.subscribeMe("foo", gameUuid)
    })
  }
}
