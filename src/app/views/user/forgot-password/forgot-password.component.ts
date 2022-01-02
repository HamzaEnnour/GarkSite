import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('passwordForm') passwordForm: NgForm;
  constructor(private notifications: NotificationsService,private router: Router,private _auth: AuthenticationService) { }
  message: string = "";
  ngOnInit() {
  }
  onSubmit() {
    this._auth.passwordRecoveryWebEJS({email:this.passwordForm.value.email}).subscribe(
      (res) => {
        if(res["message"]=="verification code")
        {this.notifications.create('Succès', "An email is sent to your inbox", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
        this.message = "An email is sent to your inbox"}
        else if(res["message"]=="Email does not exist")
        this.notifications.error('Erreur', "Please Activate your Account!", {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
      }
    )
  }

}
