import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Skills } from 'src/app/shared/models/skills.model';
import { Team } from 'src/app/shared/models/team.model';
import { User } from 'src/app/shared/models/user.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { SkillsService } from 'src/app/shared/services/skills.service';
import { TeamService } from 'src/app/shared/services/team.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-add-skills',
  templateUrl: './add-skills.component.html',
  styleUrls: ['./add-skills.component.scss']
})
export class AddSkillsComponent implements OnInit {
  @ViewChild('completeForm') completeForm!: NgForm;
  user: User = new User();
  alluser: any[];
  allteam: any[];
  allcountries = [];
  rolesArray: string[] = ["GK", "RB", "LB", "CB", "DM", "RW", "CM", "LW", "AM", "CF"]
  // faouriteplayerModel = 'Select your Favourite Player...';
  //faouriteteamModel = 'Select Your Favourite Team...';
  ageModel = '';
  token: any;
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
  ////////////////////////////////////////////////////
  setPlayerAction : Boolean = true;

  constructor(
    private _auth: AuthenticationService,
    private _skills: SkillsService,
    public dialogRef: MatDialogRef<AddSkillsComponent>,
    private notifications: NotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: Object
  ) { }

  displayFn(sub) {
    return sub ? `${sub.firstName} ${sub.lastName}` : ''
  }

  displayFnTeam(subs) {
    return subs ? `${subs.name}` : ''
  }
  displayFnCountries(subs) {
    if (subs)
    {
      $("#faouritelocalplayer").attr("disabled", false);
      $("#faouritelocalteam").attr("disabled", false);
    }
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

    $("#faouritelocalplayer").attr("disabled", true);
    $("#faouritelocalteam").attr("disabled", true);

    this.user = this.data["user"];
    this.token = this.data["token"];
    this._auth.getAllCountries(10, 0).subscribe((res) => {
      this.allcountries = res["countries"] as any[];
    })

    this._auth.getAllPlayers(0, 10, 0).subscribe(
      (res) => {
        this.alluser = res["players"] as any[];
      } )
    this._auth.getAllClubs(0, 10, 0).subscribe(
      (res) => {
        this.allteam = res["clubs"] as any[];
      } )
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

  onSubmit() {
  
    if (this.ageModel == "" ) {
      this.notifications.error('Error', "Please fulfill your age !", {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
      return;
    }
    if (this.myControlCountries.value == null ) {
      this.notifications.error('Error', "Please fulfill your nationality !", {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
      return;
    }
    if (this.myControlRole.value == null ) {
      this.notifications.error('Error', "Please fulfill your role !", {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
      return;
    }

    let roleInput: string = this.myControlRole.value;
    let reqBody = {
      player: this.user._id,
      height: 0, /// not obliga
      weight: 0, /// not obliga
      bestTeamWorld: this.myControlTeamFav.value?._id || null,
      bestPlayerWorld: this.myControlPlayerFav.value?._id || null,
      bestPlayerLocal: this.myControlLocalPlayerFav.value?._id || null,
      bestTeamLocal: this.myControlLocalTeamFav.value?._id || null,
      pace: 50,
      shooting: 50,
      passing: 50,
      dribbling: 50,
      defending: 50,
      physical: 50,
      score: 50,
      role: roleInput?.toUpperCase() || '', /// select role from enum , obligatoire + nationality
      nationality: this.myControlCountries.value?._id || null, /// enum or library
      age: parseInt(this.ageModel), /// insert age
      description: "Not mentioned",
    }
    this._skills.add_skills(reqBody).subscribe(
      (res) => {
        //this._auth.saveToken(token);
       

        const Body = {
          email: this.user.email
        }
       
        
        this._auth.updatecompletedInformation(Body).subscribe(
          (res) => {
            this.dialogRef.close(true);
          }
        )

      }
    )
  }
  onRemove() {
    this.dialogRef.close(false);
  }

}
