import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild('resetForm') resetForm: NgForm;
  constructor(private notifications: NotificationsService,
    private router: Router,
    private route : ActivatedRoute,private _auth: AuthenticationService) { }
    userId : string = "";
    userName : string = "";
    userEmail: string ="";
  ngOnInit() {
  
    this.route.params.subscribe((params)=>{
      const token = params["token"];
      this._auth.verifyreset({token:token}).subscribe(
        (res)=>{
          if(!res["creds"]){
          if(res["Message"]=="Veuillez reconsulter votre boite mail, ce lien a expire")
          console.log("Veuillez reconsulter votre boite mail, ce lien a expire"); 
          else if(res["Message"]=="Utilisateur non trouvable")
          console.log("Utilisateur non trouvable"); 
        }
        else if(res["creds"]){
          this.userId = res["xd"];
          this.userName = res["name"];
          this.userEmail = res["email"];
        }      
        },
        (err)=>{
          console.log(
          "Une erreur a survenue, veuillez réessayer plus tard"
          );
        }
      )
    })
  }

  get newPassword(){
    return this.resetForm.control.get('newPassword').value;
  }
  onSubmit(){
    this._auth.passwordReset({email:this.userEmail,password:this.newPassword}).subscribe(
      (res)=> {
        if(res["message"]=="Error")
        {
          this.notifications.create('Erreur', "Une erreur a survenue", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
        }
        else if (res["message"]=="Password has been reset")
        {
          this.notifications.create('Succès', "Mot de passe mis à jour avec succès", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
     
        setTimeout(()=>{
          this.router.navigateByUrl('/views/login');
        },2000)
        }
        
      }
    )
  }

}
