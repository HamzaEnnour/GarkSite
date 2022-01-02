import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Match } from 'src/app/shared/models/match.model';
import { MatchAction } from 'src/app/shared/models/matchAction.model';
import { Team } from 'src/app/shared/models/team.model';
import { MatchService } from 'src/app/shared/services/match.service';
import { TeamService } from 'src/app/shared/services/team.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-team-last-results',
  templateUrl: './team-last-results.component.html',
  styleUrls: ['./team-last-results.component.scss']
})
export class TeamLastResultsComponent implements OnInit {

  token
  myTeam : Team
  matches : Match[] = [];

  constructor(
    private route: ActivatedRoute,
    private _team: TeamService,
    private _match : MatchService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.token = params["token"];
      this._team.findByIdTeam(this.token).subscribe(
        (res) => {
      
          this.myTeam = res as Team;
        }
      )
      this._match.findByteammatch(this.token).subscribe(
        (res) => {
          
          this.matches = res as Match[]
        }
      )
    })
     
  }

  toogle() {
    $('.content-filter__toggle').toggleClass('content-filter__toggle--active');
    $('.content-filter__list').toggleClass('content-filter__list--expanded');
}

CheckTeamImage(_check) {
  return _check == 'Not mentioned' ? 'assets/imgs/team.png' : _check
}
  ConvertDate(date) {
    return moment(date).format("ddd, MMM Do");
   }

   getTeamVersus(_filter : Match) {
    return _filter.team1 == this.token ? _filter.team1 : _filter.team2
  }
  GoalsNumber(_filter,_goals : MatchAction[]) {
    return _goals?.filter(o=> o.team == _filter ).length || '0'
  }
  DidYouWinOrLose(_filter ) {
  return _filter._id== this.token  ? 'W' : 'L'
    
  }

}
