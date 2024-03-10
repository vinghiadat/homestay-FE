import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NhaToChuc } from 'src/app/Models/nhatochuc/nha-to-chuc';
import { AppConfig } from 'src/app/config/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class NhaToChucService {

  constructor(private http: HttpClient, private router: Router) { }

  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  getNhaToChuc(): Observable<NhaToChuc[]> {
    return this.http.get<NhaToChuc[]>(
      this.getFullUrl(`api/v1/organizer`)
    );
  }
}
