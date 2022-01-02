import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Challenge } from 'src/app/shared/models/challenge.model';
import { Team } from 'src/app/shared/models/team.model';
import { ChallengeService } from 'src/app/shared/services/challenge.service';
import { SkillsService } from 'src/app/shared/services/skills.service';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  teams : Team[]
  challenges : Challenge[]

  constructor(
    private _challenge : ChallengeService,
    private _skills : SkillsService,
    private _team : TeamService,
    private router: Router,
  ) { }

  ngOnInit() {
    this._team.all_teams().subscribe(
      (res) => {
        this.teams = res["teams"] as Team[]
      }
    )
    this._challenge.getChallenges().subscribe(
      (res) => {
        this.challenges = res as Challenge[]
      }
    )
  }

  CheckTeamImage(_check) {
    return _check == 'Not mentioned' ? 'assets/imgs/team.png' : _check
  }
  CheckChallengeImage(_check) {
    return _check == 'Not mentioned' ? 'assets/imgs/challenges.jpg' : _check
  }
  GoToChallenge(_id) {
    this.router.navigateByUrl('/views/challenge-overview/'+_id);
  }
  GoToTeam(_id) {
    this.router.navigateByUrl('/views/team-overview/'+_id);
  }

}
