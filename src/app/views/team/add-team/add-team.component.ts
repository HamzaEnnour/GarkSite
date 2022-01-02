import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs';
import { finalize, map, startWith } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.scss']
})
export class AddTeamComponent implements OnInit {
  @ViewChild('TeamForm') completeForm!: NgForm;
  nameModel =""
  descriptionModel= ""
  CategoryModel =""
  filename = 'Upload Image...';
  selectedFile: File = null;
  fb ='assets/images/samples/avatar-empty.png';
  downloadURL: Observable<string>;
  //////////////////////////////
  myImage = new FormControl();
  myControlCountries = new FormControl();
  filterOptionsCountries: Observable<string[]>;
  allcountries : any[];
  constructor(
    public dialogRef: MatDialogRef<AddTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Object,
    private storage: AngularFireStorage,
    private _auth: AuthenticationService,
    private notifications: NotificationsService,
    private _team: TeamService,
  ) { }

  displayFnCountries(subs) {
    return subs ? `${subs.Name}` : ''
  }

  private _filterCountries(value: string): string[] {
    const filterValues = value.toLowerCase();
    this._auth.getAllCountries(10, filterValues).subscribe((res) => {
      this.allcountries = res["countries"] as any[];
    })
    return this.allcountries.filter(co => co.Name.toLowerCase().includes(filterValues))
  }

  ngOnInit() {
    this._auth.getAllCountries(10, 0).subscribe((res) => {
      this.allcountries = res["countries"] as any[];
    })
    ///////////////////////////////////////////////
    this.filterOptionsCountries = this.myControlCountries.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.Name),
      map(Name => Name ? this._filterCountries(Name) : this.allcountries)
    )
    
  }
  onRemove() {
    this.dialogRef.close(false);
  }

  onSubmit() {
    if (this.myControlCountries.value == null || this.descriptionModel == "" || this.nameModel == "" || this.CategoryModel == "" ) {
      this.notifications.error('Error', "Invalid data!", {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
      return;
    }
    let reqBody = {
      capitaine: this.data["skills"]["_id"],
      nationality: this.myControlCountries.value["_id"],
      description: this.descriptionModel,
      name: this.nameModel,
      image: this.fb,
      categorie: this.CategoryModel,
      points : 0,
    }
    this._team.add_team(reqBody).subscribe(
      (res) => {
        this.dialogRef.close(true);
      }
    )
  }

  UpdateImage(event) {
    var n = Date.now();
    const file = event.target.files[0];
    this.filename= event.target.files[0].name;
    const filePath = `teams/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`teams/${n}`, file);
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

}
