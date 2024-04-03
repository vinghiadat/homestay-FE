import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Registration } from 'src/app/Models/registration/registration';
import { SuKien } from 'src/app/Models/sukien/su-kien';
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
  getEventsByUserIdAndStatusAndOrganizerIdAndName(userId: number | string,eventStatus: string | null, eventName?: string | null, organizerId?: number | string): Observable<SuKien[]> {
    return this.http.get<SuKien[]>(
      this.getFullUrl(`api/v1/registration/user/${userId}?eventStatus=${eventStatus}&eventName=${eventName}&organizerId=${organizerId}`)
    );
  }
  getRegistrationByUserIdAndEventId(userId: number,eventId:number) :Observable<Registration> {
    return this.http.get<Registration>(this.getFullUrl(`api/v1/registration/user/${userId}/event/${eventId}`));
  }
  updateById(id: number,userId:number, r: any) :Observable<any> {
    return this.http.patch<void>(this.getFullUrl(`api/v1/registration/${id}/user/${userId}`),r);
  }
  getAllRegistrationByFilter(eventId: number | string, userFullname:string | null): Observable<Registration[]> {
    return this.http.get<Registration[]>(this.getFullUrl(`api/v1/registration/order-by-registration-date/filter?eventId=${eventId}&userFullname=${userFullname}`));
  }
}
