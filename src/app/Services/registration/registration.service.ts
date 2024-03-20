import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Registration } from 'src/app/Models/registration/registration';
import { AppConfig } from 'src/app/config/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient, private router: Router) { }

  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  registerEvent(registration: any): Observable<any> {
    return this.http.post<Registration>(
      this.getFullUrl(`api/v1/registration`),registration
    );
  }
  checkExist(userId: number, eventId: number) : Observable<Boolean> {
    return this.http.get<Boolean>(this.getFullUrl(`api/v1/registration/check-exist?userId=${userId}&eventId=${eventId}`))
  };
}
