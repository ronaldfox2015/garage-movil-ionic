import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RoleModel} from "./model/role.model";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  add(user: RoleModel): Observable<any> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
    );
    return this.http.post(`/api/RolPersona`, JSON.stringify(user), { headers });
  }
}
