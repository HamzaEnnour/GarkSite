import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Match } from '../models/match.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private readonly baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  all_matchs() {
    return this.http.get(`${this.baseUrl}/all_matchs`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  add_match(match: Match) {
    return this.http.post(`${this.baseUrl}/add_match`, match, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  delete_match(_id: any) {
    return this.http.delete(`${this.baseUrl}/delete_match/${_id}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  update_match(_id: any, match: Match) {
    return this.http.put(`${this.baseUrl}/update_match/${_id}`, match, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  update_matches( match: Match) {
    return this.http.put(`${this.baseUrl}/update_matches`, match, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  findByIdmatch(_id: any) {
    return this.http.get(`${this.baseUrl}/findByIdmatch/${_id}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  findByteammatch(_id: any) {
    return this.http.get(`${this.baseUrl}/findByteammatch/${_id}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
}
