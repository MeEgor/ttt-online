import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { map } from "rxjs/operators"
import { environment } from 'src/environments/environment';

export interface CreateGameParams {
  width: number
  height: number
  winRowSize: number
}

export interface GameCreateResponse {
  uuid: string
}

@Injectable({
  providedIn: 'root'
})
export class GameApiService {
  private readonly apiHost = environment.apiHost
  private apiPath = "api/v1"

  constructor(
    private http: HttpClient
  ) {}

  create(game: CreateGameParams): Observable<string> {
    const url = this.buildUrl(["games"])
    const body = { game }
    return this.http.post<GameCreateResponse>(url, body).pipe(map(resp => resp.uuid))
  }

  private buildUrl(url: string[]): string {
    return [this.apiHost, this.apiPath].concat(url).join("/")
  }
}