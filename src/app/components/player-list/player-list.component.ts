import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Player } from '../../common/player';
import { PlayerService } from '../../services/player.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  player: Player = new Player();
  players: Observable<Player[]>;

  form=new FormGroup({
    full_name:new FormControl("",Validators.compose([Validators.required,
      Validators.minLength(3)])),
    birthday:new FormControl('',Validators.required),
    start_career:new FormControl('',Validators.required)
  });
  constructor(private playerService: PlayerService, private router: Router) {}


  savePlayer(){
    this.playerService.savePlayer(this.player).subscribe(data => {
      this.player = new Player();
      console.log(data);
      this.ngOnInit(); }
    );
  }

  onSubmit(form: FormGroup) {
    this.savePlayer();
  }

  updatePlayerById(id: number){
    this.router.navigate(['updatePlayer', id]);
  }

  getPlayerById(id: number){
    this.router.navigate(['getPlayer', id]);
  }

  deletePlayer(id: number){
    this.playerService.deletePlayer(id)
      .subscribe(
        data => {
          console.log(data);
          this.ngOnInit();
        },
        error => console.log(error));
  }

  ngOnInit(): void {
    this.players = this.playerService.getAllFreePlayers();
  }

}
