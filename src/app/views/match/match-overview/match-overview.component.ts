import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Match } from 'src/app/shared/models/match.model';
import { MatchService } from 'src/app/shared/services/match.service';
import * as $ from 'jquery';
import { SkillsService } from 'src/app/shared/services/skills.service';
import { Skills } from 'src/app/shared/models/skills.model';
@Component({
  selector: 'app-match-overview',
  templateUrl: './match-overview.component.html',
  styleUrls: ['./match-overview.component.scss']
})
export class MatchOverviewComponent implements OnInit {
  token
  myMatch : Match
  myManOfTheMatch : Skills

  constructor(
    private route: ActivatedRoute,
    private _match : MatchService,
    private _skills : SkillsService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.token = params["token"];
      this._match.findByIdmatch(this.token).subscribe(
        (res) => {
          
          this.myMatch = res as Match;
          this._skills.findPlayerByIdskills(this.myMatch.manOfTheMatch._id).subscribe(
            (res) => {
              this.myManOfTheMatch= res as Skills
            }
          )
        }
      )
    })
     
  }

  ConvertMin(starts, ends) { 
    var now = moment(starts)
    var end = moment(ends)
    var duration = moment.duration(end.diff(now));
    var mins = duration.asMinutes();
    return mins +''
  }

  ConvertDate(date) {
   return moment(date).format("dddd, MMMM Do");
  }
  ConvertFullDate(date) {
   return moment(date).format("MMMM Do YYYY, h:mm:ss a");
  }
  
  toogle() {
      $('.content-filter__toggle').toggleClass('content-filter__toggle--active');
      $('.content-filter__list').toggleClass('content-filter__list--expanded');
  }

  GoalsNumber(_filter) {
    return this.myMatch.goals.filter(o=> o.team == _filter )
  }
  YellowCardsNumber(_filter) {
    return this.myMatch.yellowCards.filter(o=> o.team == _filter )
  }
  RedCardsNumber(_filter) {
    return this.myMatch.redCards.filter(o=> o.team == _filter )
  }
  CheckTeamImage(_check) {
    return _check == 'Not mentioned' ? 'assets/imgs/team.png' : _check
  }

  GoalsPlayer(_filter) {
    let a = null
     this.myMatch.team1.titulares.filter(t => {
      if(t._id == _filter)
      {
        a=t;
      }
    })
    if ( a == null) {
      this.myMatch.team1.substitutes.filter(t => {
        if(t._id == _filter)
        {
          a=t;
        }
      })
    }
    if ( a == null) {
      
        if(this.myMatch.team1.capitaine._id == _filter)
        {
          a=this.myMatch.team1.capitaine;
        }
    }
    return a;
  }
  GoalsPlayerTeam2(_filter) {
    let a = null
     this.myMatch.team2.titulares.filter(t => {
      if(t._id == _filter)
      {
        a=t;
      }
    })
    if ( a == null) {
      this.myMatch.team2.substitutes.filter(t => {
        if(t._id == _filter)
        {
          a=t;
        }
      })
    }
    if ( a == null) {
      
        if(this.myMatch.team2.capitaine._id == _filter)
        {
          a=this.myMatch.team2.capitaine;
        }
    }
    return a;
  }
  GetGoalsOfTeam(_team,_team_id) {
    return _team == 'team1' ? this.myMatch.goals.filter(o=> o.team == _team_id )
                            : this.myMatch.goals.filter(o=> o.team == _team_id )
  }
  GetyellowCardsOfTeam(_team,_team_id) {
    return _team == 'team1' ? this.myMatch.yellowCards.filter(o=> o.team == _team_id )
                            : this.myMatch.yellowCards.filter(o=> o.team == _team_id )
  }
  GetredCardsOfTeam(_team,_team_id) {
    return _team == 'team1' ? this.myMatch.redCards.filter(o=> o.team == _team_id )
                            : this.myMatch.redCards.filter(o=> o.team == _team_id )
  }

  GuessWinner(_filter) {
  return  _filter == 'team1' ? this.myMatch.team1._id == this.myMatch.winner._id ?  'alc-event-competitors__item alc-event-team alc-event-team--winner'
                                                                                 :  'alc-event-competitors__item alc-event-team'
                             : this.myMatch.team2._id == this.myMatch.winner._id ?  'alc-event-competitors__item alc-event-team alc-event-team--winner'
                                                                                 :  'alc-event-competitors__item alc-event-team' 
  }

}
