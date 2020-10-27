import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameActionCableService } from './game.service'

@Component({
  selector: 'app-game',
  templateUrl: 'game.component.html',
  styleUrls: ['game.component.sass']
})
export class GameComponent {
  constructor(
    private gameCable: GameActionCableService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const gameUuid = params["uuid"]
      this.gameCable.subscribeMe("foo", gameUuid)
    })
  }
}
