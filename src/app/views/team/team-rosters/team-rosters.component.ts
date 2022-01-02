import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/shared/models/team.model';
import { TeamService } from 'src/app/shared/services/team.service';
import * as $ from 'jquery';
import { SkillsService } from 'src/app/shared/services/skills.service';
import { Skills } from 'src/app/shared/models/skills.model';


@Component({
  selector: 'app-team-rosters',
  templateUrl: './team-rosters.component.html',
  styleUrls: ['./team-rosters.component.scss']
})
export class TeamRostersComponent implements OnInit {

  token
  myTeam : Team
  Cap : Skills

  constructor(
    private route: ActivatedRoute,
    private _team: TeamService,
    private _skills: SkillsService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.token = params["token"];
      this._team.findByIdTeam(this.token).subscribe(
        (res) => {
          this.myTeam = res as Team;
          this._skills.findByIdskills(this.myTeam.capitaine).subscribe(
            (reso) => {
              this.Cap = reso as Skills;
            }
          )
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



}
