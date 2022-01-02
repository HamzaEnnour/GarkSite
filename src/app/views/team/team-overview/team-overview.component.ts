import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Team } from 'src/app/shared/models/team.model';
import { TeamService } from 'src/app/shared/services/team.service';
import * as $ from 'jquery';
import { MatchService } from 'src/app/shared/services/match.service';
import { Match } from 'src/app/shared/models/match.model';
@Component({
  selector: 'app-team-overview',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.scss']
})
export class TeamOverviewComponent implements OnInit {

  token
  myTeam : Team
  matches : Match[] = [];

  constructor(
    private route: ActivatedRoute,
    private _team : TeamService,
    private _match : MatchService,
    private router: Router,
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

  GoToChallenge(_id) {
    this.router.navigateByUrl('/views/challenge-overview/'+_id);
  }
  CheckTeamImage(_check) {
    return _check == 'Not mentioned' ? 'assets/imgs/team.png' : _check
  }
  CheckChallengeImage(_check) {
    return _check == 'Not mentioned' ? 'assets/imgs/challenges.jpg' : _check
  }
  
  GoalsNumber(_filter,_match) {
    return _match.goals.filter(o=> o.team == _filter )?.length || 0;
  }
  YellowCardsNumber(_filter,_match) {
    return _match.yellowCards.filter(o=> o.team == _filter )
  }
  RedCardsNumber(_filter,_match) {
    return _match.redCards.filter(o=> o.team == _filter )
  }

  LastestMatches(_filter : Match[]) {   
    return _filter.sort((a,b) => {
      return  moment(b.start_date).unix() - moment(a.start_date).unix()
    } ).slice(0,4)
  }

  GuessWinner(_filter,_match) {
  return  _filter == 'team1' ? _match.team1._id == _match.winner._id ?  'widget-results__score-winner'
                                                                     :  'widget-results__score-loser'
                             : _match.team2._id == _match.winner._id ?  'widget-results__score-winner'
                                                                     :  'widget-results__score-loser' 
  }

  ConvertMin(starts, ends) { 
    var now = moment(starts)
    var end = moment(ends)
    var duration = moment.duration(end.diff(now));
    var mins = duration.asMinutes();
    return mins +''
  }

  toogle() {
    $('.content-filter__toggle').toggleClass('content-filter__toggle--active');
    $('.content-filter__list').toggleClass('content-filter__list--expanded');
}

  counter(i: number) {
    return new Array(i);
}

  ConvertDate(date) {
   return moment(date).format("dddd, MMMM Do");
  }
  ConvertFullDate(date) {
    return moment(date).format("MMMM Do YYYY");
  }
  ConvertSemiDate(date) {
    return moment(date).format("ddd, MMM Do");
  }

}
