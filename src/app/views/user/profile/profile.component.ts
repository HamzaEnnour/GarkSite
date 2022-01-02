import { DatePipe, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import { finalize, map, startWith } from 'rxjs/operators';
import { Skills } from 'src/app/shared/models/skills.model';
import { User } from 'src/app/shared/models/user.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { SkillsService } from 'src/app/shared/services/skills.service';
import { AddTeamComponent } from '../../team/add-team/add-team.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('SkillsForm') SkillsForm!: NgForm;
  @ViewChild('UserForm') UserForm!: NgForm;
  myUser : User;
  mySkills : Skills;
  alluser: any[];
  allteam: any[];
  allcountries = [];
  rolesArray: string[] = ["GK", "RB", "LB", "CB", "DM", "RW", "CM", "LW", "AM", "CF"]
  ageModel = '';
  heightModel = '';
  weightModel = '';
  filename = 'Upload Image...';
  path ='assets/images/samples/avatar-empty.png';
  descriptionModel = '';
  filterOptionsPlayer: Observable<string[]>;
  filterOptionsTeam: Observable<string[]>;
  filterOptionsLocalPlayer: Observable<string[]>;
  filterOptionsLocalTeam: Observable<string[]>;
  filteredRoles: Observable<string[]>;
  filterOptionsCountries: Observable<string[]>;
  myControlPlayerFav = new FormControl();
  myControlTeamFav = new FormControl();
  myControlLocalPlayerFav = new FormControl();
  myControlLocalTeamFav = new FormControl();
  myControlRole = new FormControl();
  myControlCountries = new FormControl();
  myImage = new FormControl();
  //////////////////////////// User Content ///////////////////////////////
  firstnameModel = '';
  lastnameModel = '';
  emailModel = '';
  birthdayModel = '';
  passwordModel = '';
  passwordrepeatModel = '';
  addressModel = '';
  phoneModel = '';
  
 //////////////////////////// End User Content ///////////////////////////////

 selectedFile: File = null;
 fb;
 downloadURL: Observable<string>;

 /////////////////////////////////////////////////////////////////////////////
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _auth: AuthenticationService,
    private _skills: SkillsService,
    private datePipe: DatePipe,
    private notifications: NotificationsService,
    private storage: AngularFireStorage,
    public dialog: MatDialog,
    private router: Router,
    ) 
    {}

    displayFn(sub) {
      return sub ? `${sub.firstName} ${sub.lastName}` : ''
    }
  
    displayFnTeam(subs) {
      return subs ? `${subs.name}` : ''
    }
    displayFnCountries(subs) {
      /*if (subs)
      {
        $("#faouritelocalplayer").attr("disabled", false);
        $("#faouritelocalteam").attr("disabled", false);
      }*/
      return subs ? `${subs.Name}` : ''
    }
  
    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
      this._auth.getAllPlayers(0, 10, filterValue).subscribe(
        (res) => {
          this.alluser = res["players"] as any[];
        })
      return this.alluser.filter(o =>
        o.firstName.toLowerCase().includes(filterValue)
      )
    }
    private _filterLocal(value: string): string[] {
      
      const filterValue = value.toLowerCase();
      this._auth.getAllPlayers(this.myControlCountries.value["Name"], 10, filterValue).subscribe(
        (res) => {
          this.alluser = res["players"] as any[];
        })
      return this.alluser.filter(o =>
        o.firstName.toLowerCase().includes(filterValue)
      )
    }
    private _filterTeam(value: string): string[] {
      const filterValues = value.toLowerCase();
      this._auth.getAllClubs(0, 10, filterValues).subscribe(
        (res) => {
          this.allteam = res["clubs"] as any[];
        })
      return this.allteam.filter(op =>
        op.name.toLowerCase().includes(filterValues)
      )
    }
    private _filterTeamLocal(value: string): string[] {
      
      const filterValues = value.toLowerCase();
      this._auth.getAllClubs(this.myControlCountries.value["Name"], 10, filterValues).subscribe(
        (res) => {
          this.allteam = res["clubs"] as any[];
        })
      return this.allteam.filter(op =>
        op.name.toLowerCase().includes(filterValues)
      )
    }
    private _filterCountries(value: string): string[] {
      const filterValues = value.toLowerCase();
      this._auth.getAllCountries(10, filterValues).subscribe((res) => {
        this.allcountries = res["countries"] as any[];
      })
      return this.allcountries.filter(co => co.Name.toLowerCase().includes(filterValues))
    }
    private _filterRoles(value: string): string[] {
      const filterValue = value.toUpperCase();
      return this.rolesArray.filter(option => option.toUpperCase().includes(filterValue));
    }

  ngOnInit() {
    $("#skills").hide();
    //$("#faouritelocalplayer").attr("disabled", true);
    //$("#faouritelocalteam").attr("disabled", true);

    this._auth.findByIduser(this._auth.Payload["signiature"]).subscribe(
      (res) => {
        this.myUser=res as User;

        this.emailModel=this.myUser.email;
        this.firstnameModel=this.myUser.firstName;
        this.lastnameModel=this.myUser.lastName;
        this.birthdayModel=this.datePipe.transform(this.myUser.birth_date, 'yyyy-MM-dd');
        this.addressModel=this.myUser.address;
        this.phoneModel=this.myUser.phone;
        if(this.myUser.photo=="Not mentioned")
        this.fb='assets/images/samples/avatar-empty.png';
        else 
        this.fb=this.myUser.photo
      }
    )
    /////////////////////////////////////////////////////////////////////
    this._skills.findPlayerByIdskills(this._auth.Payload["signiature"]).subscribe(
      (res) => {
        this.mySkills=res as Skills;
        this.ageModel=this.mySkills.age+"";
        this.heightModel=this.mySkills.height+"";
        this.weightModel=this.mySkills.weight+"";
        this.descriptionModel=this.mySkills.description;
        this.myControlCountries.setValue(this.mySkills.nationality);
        this.myControlRole.setValue(this.mySkills.role);
        this.myControlPlayerFav.setValue(this.mySkills.bestPlayerWorld);
        this.myControlTeamFav.setValue(this.mySkills.bestTeamWorld);
        this.myControlLocalPlayerFav.setValue(this.mySkills.bestPlayerLocal);
        this.myControlLocalTeamFav.setValue(this.mySkills.bestTeamLocal);

      }
    )
    /////////////////////////////////////////////////////////////////////
      

    /////////////////////////////////////////////////////////////////////
    this._auth.getAllCountries(10, 0).subscribe((res) => {
      this.allcountries = res["countries"] as any[];
    })

    this._auth.getAllPlayers(0, 10, 0).subscribe(
      (res) => {
        this.alluser = res["players"] as any[];
      })
    this._auth.getAllClubs(0, 10, 0).subscribe(
      (res) => {
        this.allteam = res["clubs"] as any[];
      })

    this.filterOptionsPlayer = this.myControlPlayerFav.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.firstName),
      map(firstName => firstName ? this._filter(firstName) : this.alluser)
    )
    ///////////////////////////////////////////////
    this.filterOptionsTeam = this.myControlTeamFav.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterTeam(name) : this.allteam)
    )
    ///////////////////////////////////////////////
    this.filterOptionsLocalPlayer = this.myControlLocalPlayerFav.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.firstName),
      map(firstName => firstName ? this._filterLocal(firstName) : this.alluser)
    )
    ///////////////////////////////////////////////
    this.filterOptionsLocalTeam = this.myControlLocalTeamFav.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterTeamLocal(name) : this.allteam)
    )
    //////////////////////////////////////////////
    this.filteredRoles = this.myControlRole.valueChanges.pipe(
      startWith(''),
      map(value => this._filterRoles(value))
    );
    ///////////////////////////////////////////////
    this.filterOptionsCountries = this.myControlCountries.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.Name),
      map(Name => Name ? this._filterCountries(Name) : this.allcountries)
    )
  } 
  OnUserDataDiv(){
    $("#user").show( "slow", () =>{});
    $("#skills").hide( "slow", () =>{});
  }
  OnSkillsDataDiv(){
    $("#user").hide( "slow", () =>{});
    $("#skills").show( "slow", () =>{});
  }

  GoToTeam(_id) {
    this.router.navigate(["/views/team-overview/",_id])
  }

  
  
  onSubmitSkills() {
    if (this.ageModel == "" ) {
      this.notifications.error('Error', "Please fulfill your age !", {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
      return;
    }
    if (this.myControlCountries.value == null || this.myControlCountries.value == "" ) {
      this.notifications.error('Error', "Please fulfill your nationality !", {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
      return;
    }
    if (this.myControlRole.value == null || this.myControlRole.value == "" ) {
      this.notifications.error('Error', "Please fulfill your role !", {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
      return;
    }
    if(this.heightModel == "")
    this.heightModel='0';
    if(this.weightModel == "")
    this.weightModel='0';

    let roleInput : string = this.myControlRole.value;
    let reqBody = {
      //player: this.myUser._id,
      height: parseInt(this.heightModel), 
      weight: parseInt(this.weightModel), 
      bestTeamWorld: this.myControlTeamFav.value?._id || null,
      bestPlayerWorld: this.myControlPlayerFav.value?._id || null,
      bestPlayerLocal: this.myControlLocalPlayerFav.value?._id || null,
      bestTeamLocal: this.myControlLocalTeamFav.value?._id || null,
      role: roleInput?.toUpperCase() || '', /// select role from enum , obligatoire + nationality
      nationality: this.myControlCountries.value?._id || null, /// enum or library
      age: parseInt(this.ageModel), /// insert age
      description: this.descriptionModel,
    }
    this._skills.update_skills(this.mySkills._id,reqBody).subscribe(
      (res) => {
       
        if(res["message"]=="skills updated successfully in mongoDB !")
        this.notifications.create('Success', "Your Skills information was successfully updated", NotificationType.Bare,
         { theClass: 'outline primary', 
         timeOut: 6000,
         showProgressBar: false
         });
         else
         this.notifications.error('Error', "An error has occurred, please try again!", {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
      }
    )
  }

  onSubmitUser() {

    if (this.emailModel == "" || this.passwordModel == "" || this.birthdayModel == null || this.firstnameModel == "" || this.lastnameModel == "" || this.phoneModel == "") {
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
    if (this.passwordModel != this.passwordrepeatModel ) {
      this.notifications.error('Error', "Password does not match as repeat password", {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
      return;
    }
    let reqBody = {
      oldEmail: this.myUser.email, 
      newEmail: this.emailModel, 
      password: this.passwordModel,
      birth_date: this.birthdayModel,
      firstName: this.firstnameModel,
      lastName: this.lastnameModel,
      address: this.addressModel,
      phone: this.phoneModel,
      photo : this.fb 
    }
    this._auth.updateUserEmail(reqBody).subscribe(
      (res) => {
        if (res["message"]=="Wrong password")
        this.notifications.error('Error', "Please enter your current password or use a new one!", {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
        else
        {
          this.notifications.create('Success', "Your information was successfully updated", NotificationType.Bare,
         { theClass: 'outline primary', 
         timeOut: 6000,
         showProgressBar: false
         });
         setTimeout(()=> window.location.reload(),2000)
        }

      }
    )
  }

  UpdateImage(event) {
    var n = Date.now();
    const file = event.target.files[0];
    this.filename= event.target.files[0].name;
    const filePath = `players/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`players/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            
          });
        })
      )
      .subscribe(url => {
        if (url) {
          
        }
      });
   }


   ReloadSkills() {
    this._skills.findPlayerByIdskills(this._auth.Payload["signiature"]).subscribe(
      (reso) => {
        this.mySkills=reso as Skills;
        this.ageModel=this.mySkills.age+"";
        this.heightModel=this.mySkills.height+"";
        this.weightModel=this.mySkills.weight+"";
        this.descriptionModel=this.mySkills.description;
        this.myControlCountries.setValue(this.mySkills.nationality);
        this.myControlRole.setValue(this.mySkills.role);
        this.myControlPlayerFav.setValue(this.mySkills.bestPlayerWorld);
        this.myControlTeamFav.setValue(this.mySkills.bestTeamWorld);
        this.myControlLocalPlayerFav.setValue(this.mySkills.bestPlayerLocal);
        this.myControlLocalTeamFav.setValue(this.mySkills.bestTeamLocal);

      }
    )
  }

   AddTeam() {
    const spentDialog = this.dialog.open(AddTeamComponent,
      {
        width: '500px',
        data: { create: true , skills : this.mySkills  }
      })

    spentDialog.afterClosed().subscribe((res) => {
      res && this.ReloadSkills()       
    })
   }

}
