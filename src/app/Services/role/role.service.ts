import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from 'src/app/Models/role/role';
import { AppConfig } from 'src/app/config/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient, private router: Router) { }

  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.getFullUrl(`api/v1/role`));
  }
  addRole(role: Role, userId: number | string | null) :Observable<any> {
    return this.http.post<void>(this.getFullUrl(`api/v1/role/user/${userId}`),role);
  }
  deleteById(id: number, userId: number | string | null) :Observable<any> {
    return this.http.delete<void>(this.getFullUrl(`api/v1/role/${id}/user/${userId}`));
  }
}
