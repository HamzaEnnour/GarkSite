import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { ViewsComponent } from './views.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AddSkillsComponent } from './user/add-skills/add-skills.component';

import { PlayerOverviewComponent } from './player/player-overview/player-overview.component';
import { PlayerStatsComponent } from './player/player-stats/player-stats.component';

import { MatchOverviewComponent } from './match/match-overview/match-overview.component';
import { MatchBoxScoreComponent } from './match/match-box-score/match-box-score.component';
import { MatchPlayByPlayComponent } from './match/match-play-by-play/match-play-by-play.component';

import { TeamOverviewComponent } from './team/team-overview/team-overview.component';
import { TeamRostersComponent } from './team/team-rosters/team-rosters.component';
import { TeamLastResultsComponent } from './team/team-last-results/team-last-results.component';
import { AddTeamComponent } from './team/add-team/add-team.component';

import { ChallengeOverviewComponent } from './challenge/challenge-overview/challenge-overview.component';
import { ChallengeRankingComponent } from './challenge/challenge-ranking/challenge-ranking.component';

import { HomeComponent } from './Home/home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { CookieModule, CookieService } from 'ngx-cookie';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

/// materials
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
/////


import { AngularFireModule } from "@angular/fire";
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask
} from "@angular/fire/storage";
/// services
import { AuthenticationService } from '../shared/services/authentication.service';
import { MatchService } from '../shared/services/match.service';
import { MatchActionService } from '../shared/services/matchAction.service';
import { TeamService } from '../shared/services/team.service';
import { SkillsService } from '../shared/services/skills.service';
import { ChallengeService } from '../shared/services/challenge.service';
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [
    ViewsComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AddSkillsComponent,
    ProfileComponent,
    PlayerOverviewComponent,
    PlayerStatsComponent,
    MatchOverviewComponent,
    MatchBoxScoreComponent,
    MatchPlayByPlayComponent,
    TeamOverviewComponent,
    TeamRostersComponent,
    TeamLastResultsComponent,
    AddTeamComponent,
    ChallengeOverviewComponent,
    ChallengeRankingComponent,
    HomeComponent,
    
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    /////materials
    MatDialogModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatBadgeModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    /////
    SimpleNotificationsModule.forRoot(),
    CookieModule.forRoot(),
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud")
  ],
  entryComponents: [
    AddSkillsComponent,
    AddTeamComponent,
  ],
  providers: [DatePipe,CookieService, AuthenticationService,TeamService,SkillsService,MatchService,MatchActionService,ChallengeService]
})
export class ViewsModule { }
