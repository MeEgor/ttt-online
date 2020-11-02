import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { AngularTokenService } from 'angular-token'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

@Injectable()
export class GameGuard implements CanActivate {
  constructor(
    private tokenService: AngularTokenService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    if (!this.tokenService.userSignedIn()) {
      localStorage.setItem('redirectTo', route.url.map(s => s.path).join("/"))
      this.router.navigate(["sign-in"])
    }
    if (this.tokenService.currentUserData) {
      return of(true)
    } else {
      return this.tokenService.validateToken().pipe(
        map(resp => true),
        catchError(err => of(false))
      )
    }
  }
}