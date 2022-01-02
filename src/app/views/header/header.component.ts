import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Skills } from 'src/app/shared/models/skills.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { SkillsService } from 'src/app/shared/services/skills.service';
import { AddTeamComponent } from '../team/add-team/add-team.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild("insideElement") insideElement;
  mySkills : Skills
  constructor(
    @Inject(DOCUMENT) private document: Document,
    public dialog: MatDialog,
    private _auth: AuthenticationService,
    private _skills: SkillsService,
    private router: Router,
  ) { }

  

  ngOnInit(): void {
    if(this._auth.isAuthenticated){
      this._skills.findPlayerByIdskills(this._auth.Payload["signiature"]).subscribe(
        (reso) => {
          this.mySkills=reso as Skills;
        }
      )
    }
    

  }

  GoToProfile() {
    this.router.navigateByUrl('/views/profile');
  }
  CheckUserImage(_check) {
    return _check == 'Not mentioned' ? 'assets/imgs/user_static.png' : _check
  }

  LogOut () {
    this._auth.signOut();
  }

  OnModelOpened(){
    this.document.body.classList.add('site-wrapper--has-overlay');
  }
  OnModelRemoved(){
    this.document.body.classList.remove('site-wrapper--has-overlay');
  }

  isWidgetCard(notif) {

    switch (notif.notificationType) {
      case 'UserFollowedYou':
        return false;
      case 'CaptinAcceptedYourRequest':
        return true;      
      case 'GarkSendYouGC':
        return false;      
      case 'YourTeamCaptinJoinedAchallenge':
        return false;
      case 'RequestJoinYourTeam':
        return true;
      case 'InvitationToTeam':
        return true;

    }

  }

/*
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this.insideElement.nativeElement.contains(targetElement);
    if (!clickedInside) {
      //console.log('outside clicked');
    }
  }*/

  AddTeam() {
    const spentDialog = this.dialog.open(AddTeamComponent,
      {
        width: '500px',
        data: { create: true , skills : this.mySkills }
      })

    spentDialog.afterClosed().subscribe((res) => {
    })
   }

}

enum NotificationType {
  RequestJoinYourTeam,
  CaptinAcceptedYourRequest,
  InvitationToTeam,
  PlayerAcceptedYourInvitation,
  NewStory,
  YourTeamCaptinJoinedAchallenge,
  ///Transactions
  UserSendYouGC,
  UserSendYourTeamGC,
  GarkSendYouGC,
  GarkSendYourTeamGC,
  ///
  VoteOnPlayers,
  UserFollowedYou,
  UserVotedOnYou,
}
