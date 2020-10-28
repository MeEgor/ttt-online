import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { AngularTokenService } from 'angular-token'
import { Observable, of } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: AngularTokenService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    if (this.tokenService.userSignedIn()) {
      this.router.navigate(['game', 'new'])
    } else {
      return of(true)
    }
  }
}