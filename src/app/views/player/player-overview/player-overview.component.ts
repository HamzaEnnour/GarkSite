import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Skills } from 'src/app/shared/models/skills.model';
import { User } from 'src/app/shared/models/user.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { MatchService } from 'src/app/shared/services/match.service';
import { SkillsService } from 'src/app/shared/services/skills.service';
import * as moment from 'moment';
import { MatchAction } from 'src/app/shared/models/matchAction.model';
import { Team } from 'src/app/shared/models/team.model';
import { Match } from 'src/app/shared/models/match.model';
import * as $ from 'jquery';

@Component({
  selector: 'app-player-overview',
  templateUrl: './player-overview.component.html',
  styleUrls: ['./player-overview.component.scss']
})
export class PlayerOverviewComponent implements OnInit {

  myUser: User;
  mySkills: Skills;
  passing
  shooting
  dribbling
  phycial
  defending
  pace

  token
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _auth: AuthenticationService,
    private _skills: SkillsService,
    private _match: MatchService,
  ) { }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      this.token = params["token"];
      this._auth.findByIduser(this.token).subscribe(
        (res) => {
          this.myUser = res as User;
        }
      )
      this._skills.findPlayerByIdskills(this.token).subscribe(
        (res) => {
          this.mySkills = res as Skills;
          

          this.defending = this.truncIt(this.mySkills.defending);
          this.passing = this.truncIt(this.mySkills.passing);
          this.dribbling = this.truncIt(this.mySkills.dribbling);
          this.shooting = this.truncIt(this.mySkills.shooting);
          this.phycial = this.truncIt(this.mySkills.physical);
          this.pace = this.truncIt(this.mySkills.pace);
        }
      )
    })
  }

  toogle() {
    $('.content-filter__toggle').toggleClass('content-filter__toggle--active');
    $('.content-filter__list').toggleClass('content-filter__list--expanded');
}

  truncIt(x) {
    let l = Math.pow(10, Math.floor(Math.log(x) / Math.log(10)) - 1);
    let b = Math.floor(x / l);
    let digit = b - Math.floor(b / 10) * 10;
    if (digit >= 5) {
      return (Math.floor(x / 5)) * 5 + 5;
    }
    else
      return ((Math.floor(x / 5)) * 5);
  }

  ConvertMin(starts, ends) { 
    var now = moment(starts)
    var end = moment(ends)
    var duration = moment.duration(end.diff(now));
    var mins = duration.asMinutes();
    return mins +''
  }

  GoalsNumber(_filter,_goals : MatchAction[]) {
    return _goals?.filter(o=> o.team == _filter ).length || '0'
  }
  DidYouWinOrLose(_filter ) {
  return _filter.titulares?.some(f => f == this.mySkills._id) || _filter.substitutes?.some(f => f == this.mySkills._id)  ? 'W' : 'L'
    
  }
  YellowCardsNumber(_filter) {
    return this.mySkills.yellowCards.filter(o=> o.team == _filter )
  }
  RedCardsNumber(_filter) {
    return this.mySkills.redCards.filter(o=> o.team == _filter )
  }

  LastestMatches(_filter : Match[]) {   
    return _filter.sort((a,b) => {
      return  moment(b.start_date).unix() - moment(a.start_date).unix()
    } ).slice(0,4)
  }

  getTeamVersus(_filter : Match) {
    return _filter.team1.titulares?.some(f => f._id == this.mySkills._id) || _filter.team1.substitutes?.some(f => f._id == this.mySkills._id)  ? _filter.team1 : _filter.team2
  }
/*
  GuessWinner(_filter) {
  return  _filter == 'team1' ? this.mySkills.team1._id == this.mySkills.winner._id ?  'alc-event-competitors__item alc-event-team alc-event-team--winner'
                                                                                 :  'alc-event-competitors__item alc-event-team'
                             : this.mySkills.team2._id == this.mySkills.winner._id ?  'alc-event-competitors__item alc-event-team alc-event-team--winner'
                                                                                 :  'alc-event-competitors__item alc-event-team' 
  }
*/
  ConvertDate(date) {
   return moment(date).format("ddd, MMM Do");
  }


}
