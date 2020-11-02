import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.sass'],
  templateUrl: "./header.component.html"
})
export class HeaderComponent {
  constructor(
    private tokenService: AngularTokenService,
    private router: Router
  ) {}
  
  get userSignedIn(): boolean {
    return this.tokenService.userSignedIn()
  }

  logOut() {
    this.tokenService.signOut().subscribe(resp => {
      console.log("logOut()", resp)
      this.router.navigate(["sign-in"])
    })
  }
}
