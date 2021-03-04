import { Component, OnInit } from '@angular/core';
import { Team } from '../../common/team';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../../services/team.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.css']
})
export class UpdateTeamComponent implements OnInit {

  id:number;
  team:Team;
  form= new FormGroup({
    name:new FormControl("",Validators.compose([Validators.required,
      Validators.minLength(3)])),
    city:new FormControl('',Validators.required),
    country:new FormControl('',Validators.required),
    budget:new FormControl('',Validators.required),
  });
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

  onSubmit(form: FormGroup) {
    this.updateTeam();
  }

}
