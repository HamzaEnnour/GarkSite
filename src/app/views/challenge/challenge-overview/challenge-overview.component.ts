import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import * as moment from 'moment';
import { Challenge } from 'src/app/shared/models/challenge.model';
import { Match } from 'src/app/shared/models/match.model';
import { Skills } from 'src/app/shared/models/skills.model';
import { ChallengeService } from 'src/app/shared/services/challenge.service';
import { SkillsService } from 'src/app/shared/services/skills.service';

@Component({
  selector: 'app-challenge-overview',
  templateUrl: './challenge-overview.component.html',
  styleUrls: ['./challenge-overview.component.scss']
})
export class ChallengeOverviewComponent implements OnInit {
  token
  myChallenge: Challenge
  mymanOfTheTournement : Skills
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _challenge : ChallengeService,
    private _skills : SkillsService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.token = params["token"];
      this._challenge.findByIdchallenge(this.token).subscribe(
        (res) => {
     
        
          this.myChallenge = res as Challenge
          this.myChallenge.manOfTheTournement != null &&
          this._skills.findPlayerByIdskills(this.myChallenge.manOfTheTournement._id).subscribe(
            (res) => {
              
              this.mymanOfTheTournement = res as Skills
            }
          )
        }
      )
    })
  }

  getTeamFromMatch(_team) {
    let a;
    this.myChallenge.teams.filter(t =>{
      if(t._id == _team)
      {
        a=t;      
      }
    } )
    return a
  }

  CheckImage(_check) {
    return _check == 'Not mentioned' ? 'assets/imgs/challenges.jpg' : _check
  }
  CheckTeamImage(_check) {
    return _check == 'Not mentioned' ? 'assets/imgs/team.png' : _check
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
  
  GoToMatch(_id) {
    this.router.navigateByUrl('/views/match-overview/'+_id);
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
