import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../common/player';
import { Team } from '../common/team';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private baseURL = 'http://localhost:8082';

  constructor(private httpClient: HttpClient) {
    this.baseURL;
  }

  getAllPlayers(): Observable<Player[]>{
    return this.httpClient.get<Player[]>(this.baseURL + '/getAllPlayers');
  }

  getAllFreePlayers(): Observable<Player[]>{
    return this.httpClient.get<Player[]>(this.baseURL + '/freePlayers');
  }

  public savePlayer(player: Player): Observable<Player> {
    return this.httpClient.post<Player>(this.baseURL + '/addPlayer', player);
  }

  public deletePlayer(id: number): Observable<void>{
    console.log(id);
    return this.httpClient.delete<void>(this.baseURL + '/deletePlayer/' + id);
  }

  getPlayer(id: number): Observable<Player>{
    return this.httpClient.get<Player>(this.baseURL + '/getPlayerById/' + id).pipe(
      tap(data => console.log('All' + JSON.stringify(data)))
    );
  }

  updatePlayer(id: number, player: Player): Observable<Player>{
    return this.httpClient.put<Player>(this.baseURL + '/updatePlayer/' + id, player);
  }

}
