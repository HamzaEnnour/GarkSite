import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Challenge } from 'src/app/shared/models/challenge.model';
import { ChallengeService } from 'src/app/shared/services/challenge.service';
import * as $ from 'jquery';
import { Match } from 'src/app/shared/models/match.model';
import * as moment from 'moment';

@Component({
  selector: 'app-challenge-ranking',
  templateUrl: './challenge-ranking.component.html',
  styleUrls: ['./challenge-ranking.component.scss']
})
export class ChallengeRankingComponent implements OnInit {
  token
  myChallenge: Challenge

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _challenge : ChallengeService
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.token = params["token"];
      this._challenge.findByIdchallenge(this.token).subscribe(
        (res) => {
          this.myChallenge = res as Challenge
        }
      )
    })
  }

  ConvertFullDate(date) {
    return moment(date).format("MMMM Do YYYY");
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

  GoToMatch(_id) {
    this.router.navigateByUrl('/views/match-overview/'+_id);
  }
  
  CheckTeamImage(_check) {
    return _check == 'Not mentioned' ? 'assets/imgs/team.png' : _check
  }
  GuessWinner(_filter,_match) {
    return  _filter == 'team1' ? _match.team1._id == _match.winner ?  'tournament-bracket__team tournament-bracket__team--winner'
                                                                       :  'tournament-bracket__team'
                               : _match.team2._id == _match.winner ?  'tournament-bracket__team tournament-bracket__team--winner'
                                                                       :  'tournament-bracket__team' 
    }
  GoalsNumber(_filter,_match) {
    return _match.goals.filter(o=> o.team == _filter )?.length || 0;
  }

  toogle() {
    $('.content-filter__toggle').toggleClass('content-filter__toggle--active');
    $('.content-filter__list').toggleClass('content-filter__list--expanded');
  }

}
