import { Injectable } from '@angular/core';
import {Team} from '../common/team';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Player } from '../common/player';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private baseURL = 'http://localhost:8082';


  constructor(private httpClient: HttpClient) {
    this.baseURL;
  }
  getAllTeams(): Observable<Team[]>{
    return this.httpClient.get<Team[]>(this.baseURL + '/getAllTeams');
  }
  public saveTeam(team: Team): Observable<Team> {
    return this.httpClient.post<Team>(this.baseURL + '/addTeam', team);
  }

  buyFreePlayer(player_id: number, team_id: number){
    return this.httpClient.get(this.baseURL + '/addFreePlayer/'+player_id+'/'+team_id)
      .toPromise().then((data:any)=>console.log(data));
  }

  public deleteTeam(id: number): Observable<void>{
    console.log(id);
    return this.httpClient.delete<void>(this.baseURL + '/deleteTeam/' + id);
  }

  getTeam(id: number): Observable<Team>{
    return this.httpClient.get<Team>(this.baseURL + '/getTeamById/' + id).pipe(
      tap(data => console.log('All' + JSON.stringify(data)))
    );
  }

  updateTeam(id: number, team: Team): Observable<Team>{
    return this.httpClient.put<Team>(this.baseURL + '/updateTeam/' + id, team);
  }

  public transfer(player_id: number, sell_team_id: number, buy_team_id: number, commission: number){
    return this.httpClient.get<any>(this.baseURL + '/transfer/'+player_id+'/'+buy_team_id+'/'+sell_team_id+'/'+commission)
      .toPromise().then((data:any)=>console.log(data));
  }

  public terminateContract(id: number): Promise<void> {
    console.log("Term" + id)
    return this.httpClient.get<any>(this.baseURL + '/terminateContract/' + id).toPromise()
      .then((data: any) => console.log(data));
  }
}
