import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Notification } from '../models/notification.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private auth: AuthenticationService) { }
  add_notification(Notfi: Notification) {
    return this.http.post(`${this.baseUrl}/add_notification`, Notfi, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  delete_notification(_id: any) {
    return this.http.delete(`${this.baseUrl}/delete_notification/${_id}`, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
  update_notification(_id: any, Notfi: Notification) {
    return this.http.put(`${this.baseUrl}/update_notification/${_id}`, Notfi, {
      headers: new HttpHeaders({ authorization: this.auth.Token as any }),
    });
  }
}
