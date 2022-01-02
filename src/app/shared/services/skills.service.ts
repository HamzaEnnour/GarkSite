import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Skills } from '../models/skills.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private readonly baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  all_skills() {
    return this.http.get(`${this.baseUrl}/all_skills`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  add_skills(skills: any) {
    return this.http.post(`${this.baseUrl}/add_skills`, skills, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  delete_skills(_id: any) {
    return this.http.delete(`${this.baseUrl}/delete_skills/${_id}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  update_skills(_id: any, skills: any) {
    return this.http.put(`${this.baseUrl}/update_skills/${_id}`, skills, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  findByIdskills(_id: any) {
    return this.http.get(`${this.baseUrl}/findByIdskills/${_id}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  findPlayerByIdskills(_id: any) {
    return this.http.get(`${this.baseUrl}/findPlayerByIdskills/${_id}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  top_players() {
    return this.http.get(`${this.baseUrl}/top_players`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  add_team_player(_id: any, teamId: any) {
    return this.http.put(`${this.baseUrl}/add_team_player/${_id}/${teamId}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  /*add_favorite_player(_id: any, teamId: any) {
    return this.http.put(`${this.baseUrl}/add_favorite_player/`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }*/
}
