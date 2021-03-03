import { Component, OnInit } from '@angular/core';

import { Team } from '../../common/team';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {

  id: number;
  team: Team;

  constructor(private route: ActivatedRoute, private router: Router, private playerService: PlayerService,
              private teamService: TeamService) { }

  ngOnInit(): void {
    this.team = new Team();

    this.id = this.route.snapshot.params.id;

    this.teamService.getTeam(this.id)
      .subscribe(data => {
        console.log(data);
        this.team = data;
      });
  }

  updatePlayerById(id: number){
    this.router.navigate(['updatePlayer', id]);
  }

  getPlayerById(id: number){
    this.router.navigate(['getPlayer', id]);
  }

  getDeleteById(id: number){
    this.playerService.deletePlayer(id)
      .subscribe(
        data => {
          console.log(data);
          this.ngOnInit();
        },
        error => console.log(error));
  }
  terminateContract(id: number){
    this.teamService.terminateContract(id);
    this.ngOnInit();
  }

}
