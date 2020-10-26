import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { AuthModule } from './auth/auth.module'
import { GameModule } from './game/game.module'
import { AngularTokenModule } from 'angular-token'

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

    AuthModule,
    GameModule,

    AngularTokenModule.forRoot({
      apiBase: 'http://localhost:3000/api/v1',
    })
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
