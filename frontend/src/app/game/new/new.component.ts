import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: 'new.component.html',
  styleUrls: ['new.component.sass']
})
export class NewGameComponent {
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    
  }
}
