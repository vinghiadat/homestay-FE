import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Material } from 'src/app/Models/material/material';
import { AppConfig } from 'src/app/config/AppConfig';
@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  constructor(private http: HttpClient, private router: Router) {}
  listQuantity: number[] = [];
  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  getAllMaterial(): Observable<Material[]> {
    return this.http.get<Material[]>(this.getFullUrl(`api/v1/material`));
  }
}
