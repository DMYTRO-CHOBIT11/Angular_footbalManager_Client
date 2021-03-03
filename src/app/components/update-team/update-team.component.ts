import { Component, OnInit } from '@angular/core';
import { Team } from '../../common/team';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.css']
})
export class UpdateTeamComponent implements OnInit {

  id:number;
  team:Team;

  constructor(private route: ActivatedRoute, private router: Router, private teamService: TeamService) { }

  ngOnInit(): void {
    this.team = new Team();

    this.id = this.route.snapshot.params['id'];

    this.teamService.getTeam(this.id)
      .subscribe(data => {
        console.log(data)
        this.team = data;
      }, error => console.log(error));
  }

  updateTeam() {
    this.teamService.updateTeam(this.id, this.team)
      .subscribe(() => {
        this.team = new Team();
        this.router.navigate(['/']);
      })
  }

  onSubmit() {
    this.updateTeam();
  }

}
