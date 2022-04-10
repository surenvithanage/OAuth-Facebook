import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient
  ) { }

  loadMetaInfo(userId, accessToken): Observable<any> {
    return this.http.get('https://graph.facebook.com/' + userId + '?metadata=1&access_token=' + accessToken);
  }

  loadPermission(userId, accessToken): Observable<any> {
    return this.http.get('https://graph.facebook.com/v13.0/' + userId + '/permissions?access_token=' + accessToken);
  }
}
