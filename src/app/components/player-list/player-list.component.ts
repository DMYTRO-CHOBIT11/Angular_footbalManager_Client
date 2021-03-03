import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Player } from '../../common/player';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  player: Player = new Player();
  players: Observable<Player[]>;

  constructor(private playerService: PlayerService, private router: Router) {}


  savePlayer(){
    this.playerService.savePlayer(this.player).subscribe(data => {
      this.player = new Player();
      console.log(data);
      this.ngOnInit(); }
    );
  }

  onSubmit() {
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
