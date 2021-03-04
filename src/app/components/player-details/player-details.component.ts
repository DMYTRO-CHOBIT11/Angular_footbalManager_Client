import { Component, OnInit } from '@angular/core';
import { Team } from '../../common/team';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../../services/team.service';
import { Player } from '../../common/player';
import { PlayerService } from '../../services/player.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {

  id: number;
  player: Player;
  teams:Observable<Team[]>;

  teamBuy:number;
  commission:number;

  constructor(private route: ActivatedRoute, private router: Router, private playerService: PlayerService,
              private teamService: TeamService) { }

  ngOnInit(): void {
    this.player = new Player();

    this.id = this.route.snapshot.params.id;

    this.playerService.getPlayer(this.id)
      .subscribe(data => {
        console.log(data);
        this.player = data;
      });

    this.teams=this.teamService.getAllTeams();
  }

  terminateContract(){
    this.teamService.terminateContract(this.id);
    this.ngOnInit()
  }
  onSubmit(){
    let team_id=(<HTMLInputElement>document.getElementById("list")).value;
    this.teamService.buyFreePlayer(this.id,Number.parseInt(team_id));
    alert("Player was bought");
  }

  transfer(){
    let buyTeam=(<HTMLInputElement>document.getElementById("buyTeam")).value;
    this.teamService.transfer(this.id,this.player.team.id,+buyTeam,this.commission)
    this.ngOnInit()
  }

}
