import { Component, OnInit } from '@angular/core';
import {Team} from '../../common/team';
import {TeamService} from '../../services/team.service';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { element } from 'protractor';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  team: Team = new Team();
  teams: Observable<Team[]>;

  form= new FormGroup({
    name:new FormControl("",Validators.compose([Validators.required,
      Validators.minLength(3)])),
    city:new FormControl('',Validators.required),
    country:new FormControl('',Validators.required),
    budget:new FormControl('',Validators.required),
  });
  constructor(private teamService: TeamService, private router: Router) {}


  saveTeam(){
    this.teamService.saveTeam(this.team).subscribe(data => {
      this.team = new Team();
      console.log(data);
      this.ngOnInit(); }
    );
  }

  onSubmit(form: FormGroup) {
    this.saveTeam();
  }

  updateTeamById(id: number){
    this.router.navigate(['updateTeam', id]);
  }

  getTeamById(id: number){
    this.router.navigate(['getTeam', id]);
  }

  deleteTeam(id: number){
    this.teamService.deleteTeam(id)
      .subscribe(
        data => {
          console.log(data);
          this.ngOnInit();
        },
        error => console.log(error));
  }

  ngOnInit(): void {
    this.teams = this.teamService.getAllTeams();
  }

}
