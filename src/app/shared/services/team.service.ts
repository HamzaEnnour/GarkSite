import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Team } from '../models/team.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private readonly baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  all_teams() {
    return this.http.get(`${this.baseUrl}/getteams`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  findByIdTeam(_id: any) {
    return this.http.get(`${this.baseUrl}/findByIdTeam/${_id}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  findByCapitainId(_id: any) {
    return this.http.get(`${this.baseUrl}/findByCapitainId/${_id}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  add_team(team: any) {
    return this.http.post(`${this.baseUrl}/add_team`, team, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  delete_team(_id: any) {
    return this.http.delete(`${this.baseUrl}/delete_team/${_id}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  update_team(_id: any, team: Team) {
    return this.http.put(`${this.baseUrl}/update_team/${_id}`, team, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
}
