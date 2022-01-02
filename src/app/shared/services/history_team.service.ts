import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Terrain } from '../models/terrain.model';
import { AuthenticationService } from './authentication.service';
import { HistoryTeam } from '../models/history_team.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class HistoryTeamService {
  private readonly baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  all_history_team() {
    return this.http.get(`${this.baseUrl}/all_history_team`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  findByIdHistory_team(_id: any) {
    return this.http.get(`${this.baseUrl}/findByIdHistory_team/${_id}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  findHistoryByUserId(_id: any) {
    return this.http.get(`${this.baseUrl}/findHistoryByUserId/${_id}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  findHistoryByTeamId(_id: any) {
    return this.http.get(`${this.baseUrl}/findHistoryByTeamId/${_id}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  add_history_team(hist: HistoryTeam) {
    return this.http.post(`${this.baseUrl}/add_history_team`, hist, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  delete_history_team(_id: any) {
    return this.http.delete(`${this.baseUrl}/delete_history_team/${_id}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  update_history_team(_id: any, hist: HistoryTeam) {
    return this.http.put(`${this.baseUrl}/update_history_team/${_id}`, hist, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
}
