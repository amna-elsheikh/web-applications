import { user } from './../ts/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public url: string = 'http://localhost:9909/api/login';

  constructor(private http: HttpClient) {}

  getuser(email: any, pass: any) {
    if(this.http.get(this.url + '/' + email + '/' + pass)){
      sessionStorage.setItem("user", `user`);
      return this.http.get(this.url + '/' + email + '/' + pass);

    }
    return this.http.get(this.url + '/' + email + '/' + pass);
  }

  getusers(): Observable<user> {
    return this.http.get<user>(this.url);
  }
}
