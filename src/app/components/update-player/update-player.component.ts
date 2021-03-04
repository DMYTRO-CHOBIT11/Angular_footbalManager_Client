import { Component, OnInit } from '@angular/core';
import { Team } from '../../common/team';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../../services/team.service';
import { Player } from '../../common/player';
import { PlayerService } from '../../services/player.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-player',
  templateUrl: './update-player.component.html',
  styleUrls: ['./update-player.component.css']
})
export class UpdatePlayerComponent implements OnInit {

  id:number;
  player:Player;
  form=new FormGroup({
    full_name:new FormControl("",Validators.compose([Validators.required,
      Validators.minLength(3)])),
    birthday:new FormControl('',Validators.required),
    start_career:new FormControl('',Validators.required)
  });
  constructor(private route: ActivatedRoute, private router: Router, private playerService: PlayerService) { }

  ngOnInit(): void {
    this.player = new Player();

    this.id = this.route.snapshot.params['id'];

    this.playerService.getPlayer(this.id)
      .subscribe(data => {
        console.log(data)
        this.player = data;
      }, error => console.log(error));
  }

  updatePlayer() {
    this.playerService.updatePlayer(this.id, this.player)
      .subscribe(() => {
        this.player = new Player();
        this.router.navigate(['players']);
      })
  }

  onSubmit(form: FormGroup) {
    this.updatePlayer();
  }

}
