import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewsComponent } from './views.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { ProfileComponent } from './user/profile/profile.component';
import { PlayerOverviewComponent } from './player/player-overview/player-overview.component';
import { PlayerStatsComponent } from './player/player-stats/player-stats.component';
import { MatchOverviewComponent } from './match/match-overview/match-overview.component';
import { MatchBoxScoreComponent } from './match/match-box-score/match-box-score.component';
import { MatchPlayByPlayComponent } from './match/match-play-by-play/match-play-by-play.component';
import { TeamOverviewComponent } from './team/team-overview/team-overview.component';
import { TeamRostersComponent } from './team/team-rosters/team-rosters.component';
import { TeamLastResultsComponent } from './team/team-last-results/team-last-results.component';
import { ChallengeOverviewComponent } from './challenge/challenge-overview/challenge-overview.component';
import { ChallengeRankingComponent } from './challenge/challenge-ranking/challenge-ranking.component';
import { HomeComponent } from './Home/home/home.component';

const routes: Routes = [{
  path: '', component: ViewsComponent, children: [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgotpassword', component: ForgotPasswordComponent },
    { path: 'passwordReset/:token', component: ResetPasswordComponent },
    { path: 'profile', component: ProfileComponent },
    //// players
    { path: 'player-overview/:token', component: PlayerOverviewComponent },
    { path: 'player-stats/:token', component: PlayerStatsComponent },
    //// matches
    { path: 'match-overview/:token', component: MatchOverviewComponent },
    { path: 'match-box-score/:token', component: MatchBoxScoreComponent },
    { path: 'match-play-by-play/:token', component: MatchPlayByPlayComponent },
    //// team
    { path: 'team-overview/:token', component: TeamOverviewComponent },
    { path: 'team-roster/:token', component: TeamRostersComponent },
    { path: 'team-results/:token', component: TeamLastResultsComponent },
    //// challenge
    { path: 'challenge-overview/:token', component: ChallengeOverviewComponent },
    { path: 'challenge-ranking/:token', component: ChallengeRankingComponent },
    //// home
    { path: 'home', component: HomeComponent },
    //// redirection
    { path: '',   redirectTo: 'home', pathMatch: 'full' },

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
