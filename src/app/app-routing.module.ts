import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamListComponent } from './components/team-list/team-list.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';
import { UpdateTeamComponent } from './components/update-team/update-team.component';
import { PlayerDetailsComponent } from './components/player-details/player-details.component';
import { UpdatePlayerComponent } from './components/update-player/update-player.component';
import { PlayerListComponent } from './components/player-list/player-list.component';

const routes: Routes = [
  {path: '', component: TeamListComponent},
  {path: 'getTeam/:id', component: TeamDetailsComponent},
  {path: 'updateTeam/:id',component: UpdateTeamComponent},
  {path: 'getPlayer/:id',component:PlayerDetailsComponent},
  {path: 'updatePlayer/:id',component: UpdatePlayerComponent},
  {path: 'deletePlayer/:id',component: PlayerListComponent},
  {path: 'players',component:PlayerListComponent},
  {path: 'terminateContract/:id',component:PlayerDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule { }
