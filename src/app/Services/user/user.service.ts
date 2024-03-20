import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/user/user';
import { AppConfig } from 'src/app/config/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  taoTaiKhoan(user: User): Observable<any> {
   return this.http.post<void>(
      this.getFullUrl(`api/v1/user/register`),user
    );
  }
  dangNhap(user: User) :Observable<any> {
    return this.http.post<void>(
      this.getFullUrl(`api/v1/user/login`),user
    )
  }
  getInfoByUsername(username: string):Observable<User> {
    return this.http.get<User> (this.getFullUrl(`api/v1/user/${username}`));
  } 
}
