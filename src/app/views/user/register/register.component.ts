import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { IRegisterCredentails } from 'src/app/shared/models/user.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm') registerForm!: NgForm;
  

  emailModel: string = "";
  passwordModel: string = "";
  firstNameModel: string = "";
  lastNameModel: string = "";
  phoneModel: string = "";
  birthdayModel!: Date;


  constructor(private _auth: AuthenticationService, private notifications: NotificationsService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.emailModel == "" || this.passwordModel == "" || this.firstNameModel == "" || this.lastNameModel == "" || this.phoneModel == "" || this.birthdayModel == null) {
      this.notifications.error('Error', "Invalid data!", {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
      return;
    }
    const reEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const rePhone = /^[0-9]*$/i;
    
    if (!reEmail.test(this.emailModel.toLowerCase())) {
      this.notifications.error('Error', "wrong email format. please check and try again", {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
      return;
    }
    if (!rePhone.test(this.phoneModel) && this.phoneModel.length != 8) {
      this.notifications.error('Error', "Phone number must have at least 8 characters", {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
      return;
    }
    if (this.passwordModel.length < 8) {
      this.notifications.error('Error', "Password must have at least 8 characters", {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
      return;
    }

   


    let reqBody = {
      password : this.passwordModel,
      firstName: this.firstNameModel,
      lastName: this.lastNameModel,
      email: this.emailModel.toLowerCase(),
      address: 'Not mentioned',
      phone: this.phoneModel,
      birthDate: this.birthdayModel,
    }
    
    this._auth.register(reqBody).subscribe(
      (res: any) => {
      
        if (res["message"] == "Email already exists")
          this.notifications.error('Error', "Email already exists!", {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true
          });
        else if (res["message"] == "Phone number already exists")
          this.notifications.error('Error', "Phone number already exists!", {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true
          });
        else
        this.router.navigateByUrl(`${environment.adminRoot}/login`);
      },
      (err) => {
        
        
      }
    )
  }

}
