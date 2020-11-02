import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularTokenService } from 'angular-token';
import { map, switchMap } from 'rxjs/operators';
import { GameWsService } from './game-ws.service'
import { GameStore } from './game.store';

@Component({
  selector: 'app-game',
  templateUrl: 'game.component.html',
  styleUrls: ['game.component.sass'],
  providers: [
    GameStore,
    GameWsService
  ]
})
export class GameComponent {
  constructor(
    private gameCable: GameWsService,
    private route: ActivatedRoute,
    private tokenService: AngularTokenService
  ) { }

  ngOnInit() {
    this.route.params
      .pipe(switchMap(params => {
        const gameUuid = params["uuid"]
        return this.tokenService.authData.pipe(map(authData => {
          const accessToken = authData.accessToken
          const uid = authData.uid
          const client = authData.client
  
          return { gameUuid, accessToken, uid, client }
        }))
      }))
      .subscribe(params => {
        this.gameCable.subscribeMe(params)
        // this.gameCable.join()
      })
  }
}
