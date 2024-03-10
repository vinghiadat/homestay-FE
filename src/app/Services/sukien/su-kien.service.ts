import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NhaToChuc } from 'src/app/Models/nhatochuc/nha-to-chuc';
import { SuKien } from 'src/app/Models/sukien/su-kien';
import { AppConfig } from 'src/app/config/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class SuKienService {

  constructor(private http: HttpClient, private router: Router) { }

  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  getSuKien(): Observable<SuKien[]> {
    return this.http.get<SuKien[]>(
      this.getFullUrl(`api/v1/event`)
    );
  }
  getSuKienByOrganizerId(organizerId: number): Observable<SuKien[]> {
    return this.http.get<SuKien[]>(
      this.getFullUrl(`api/v1/event/by-organizer?organizerId=${organizerId}`)
    );
  }
}
