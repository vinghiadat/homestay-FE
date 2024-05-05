import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/config/AppConfig';
import { Type } from 'src/app/Models/homestayType/type';
@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient, private router: Router) { }

  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  getAllTypes(typeName: string): Observable<Type[]> {
    return this.http.get<Type[]>(this.getFullUrl(`api/v1/type?typeName=${typeName}`));
  }
  addType(userId:number,type: Type) : Observable<any> {
    return this.http.post<void>(this.getFullUrl(`api/v1/type/user/${userId}`),type);
  }
  deleteById(id: number, userId:number) : Observable<any> {
    return this.http.delete<void>(this.getFullUrl(`api/v1/type/${id}/user/${userId}`));
  }
  updateById(id:number, userId: number, homestayType: Type): Observable<any> {
    return this.http.patch<void>(this.getFullUrl(`api/v1/type/${id}/user/${userId}`),homestayType);
  }
  getInfoById(id: number): Observable<Type> {
    return this.http.get<Type>(this.getFullUrl(`api/v1/type/${id}`));
  }
}
