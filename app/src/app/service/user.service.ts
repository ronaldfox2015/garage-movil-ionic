import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://happyparking.keyoficiales.com'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  login(correo: string, clave: string, idTipoUsuario: number): Observable<any> {
    const idRol = Number(idTipoUsuario)
    const params = {
      "idTipoUsuario": idTipoUsuario,
      "correo": correo,
      "clave": clave,
      "idRol": idRol
    }
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
    );
    return this.http.post(`/api/Usuario/ValidaSesion`, JSON.stringify(params), { headers });
  }
}
