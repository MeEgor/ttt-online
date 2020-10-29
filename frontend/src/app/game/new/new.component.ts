import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { GameApiService } from '../game-api.service'

@Component({
  selector: 'app-game',
  templateUrl: 'new.component.html',
  styleUrls: ['new.component.sass']
})
export class NewGameComponent {
  loading = false
  form = this.fb.group({
    width: [3, [Validators.required, Validators.min(3)]],
    height: [3, [Validators.required, Validators.min(3)]],
    winRowSize: [3, [Validators.required, Validators.min(3)]]
  })

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private gameApi: GameApiService
  ) { }
  
  onSubmit() {
    this.loading = true
    const params = this.form.value
    this.gameApi.create(params).subscribe(gameUuid => {
      this.loading = false
      this.router.navigate(["game", gameUuid])
    },
    err => {
      this.loading = false
      console.log("can not create game", err)
    })
  }
}
