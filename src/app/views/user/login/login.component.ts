import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { CookieService } from 'ngx-cookie';
import { ICredentails, User } from 'src/app/shared/models/user.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { MatDialog } from '@angular/material/dialog';
import { AddSkillsComponent } from '../add-skills/add-skills.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm!: NgForm;
  @ViewChild('myCheckbox') myCheckbox;
  emailModel = '';
  passwordModel = '';
  rememberMe: boolean = false;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private notifications: NotificationsService,
    private cookieService: CookieService,
    private _auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    let dataCookie = this.cookieService.get(environment.remember)
    if (dataCookie) {
      this.getUserCredentials(dataCookie);
      this.rememberMe = true;
    }

  }

  userCredentials: ICredentails = {
    email: "",
    password: "",
  }

  clickCompleteYourAccount(user: User,token) {
    const spentDialog = this.dialog.open(AddSkillsComponent,
      {
        width: '500px',
        data: { create: true, user:user,token:token }
      })

    spentDialog.afterClosed().subscribe((res) => {
      res ? window.location.href = '/views/home'
          : this._auth.signOut()

    })
  }
  onClick(e) {

    this.rememberMe = this.myCheckbox.nativeElement.checked

  }
  onSubmit() {
    if (this.emailModel == "" && this.passwordModel == "") {
      this.notifications.error('Error', "Données invalide!", {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
      return;
    }
    this.userCredentials.email = this.emailModel.toLowerCase();
    this.userCredentials.password = this.passwordModel;

    this._auth.logIn(this.userCredentials).subscribe(
      (res: any) => {
        if (res["status"] == "SUCCESS") {
          let token =res["token"];
          this._auth.saveToken(token);
          if (this.rememberMe) {
            this.saveUserCredentials();
          }

          this._auth.getUser(this.emailModel).subscribe(
            (res) => {
              if (res["message"] == "user =)") {
                let user = res["user"] as User;

                if (!user.completedInformation) {
                  this.clickCompleteYourAccount(user,token)
                }
                else {
                  window.location.href = '/views/home'
                }
              }
            }
          )
        }

      },
      (err) => {
     
        if (err["error"]["message"] == "Email does not exist")
          this.notifications.error('Error', "Email does not exist!", {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true
          });
        else if (err["error"]["message"] == "Please Verify your mail")
          this.notifications.error('Error', "Please Activate your Account!", {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true
          });
        else if (err["error"]["message"] == "Wrong password")
          this.notifications.error('Error', "Wrong password!", {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true
          });
        //res == { message : "system error" }
        /*this.notifications.error('Error', "Données invalide!", {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });*/
      }
    )
  }


  saveUserCredentials() {
    let credentials = { email: this.userCredentials.email, password: this.userCredentials.password };
    const data = btoa(JSON.stringify(credentials));
    let encrypted = this.encryptData(data);
    var dt = new Date();
    dt.setDate(dt.getDate() + 15);
    this.cookieService.put(environment.remember, encrypted,{expires: dt });
  }

  getUserCredentials(data: any) {
    let encrypted = this.decryptData(data);
    let credentials = JSON.parse(atob(encrypted));

    this.userCredentials.email = credentials["email"];
    this.userCredentials.password = credentials["password"];

    this.emailModel = this.userCredentials.email;
    this.passwordModel = this.userCredentials.password;
  }

  encryptData(data: any) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), environment.rememberSecret).toString();
    } catch (e) {
      return data;
    }
  }

  decryptData(data: any) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, environment.rememberSecret);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) { }
  }

}
