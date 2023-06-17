import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Search, SearchDto} from "./dto/search.dto";
import {GarageDetailDto} from "./dto/garage-detail.dto";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  async get(name: string = '', page: number = 1, rows: number = 5): Promise<unknown> {

    const params = {
      "idCochera": 0,
      "idPersona": 0,
      "idUbicacion": 0,
      "ubicacion": name,
      "nombre": "",
      "idUsuarioModificacion": 0,
      "estado": 0,
      "fechaInicio": "",
      "fechaFin": "",
      "numeroPagina": page,
      "totalPorPagina": rows
    }
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
    );

    return new Promise(async (resolve, reject) => {
      await this.http.post(`/api/Cochera/ObtenerPorConcepto`, JSON.stringify(params), {headers}).subscribe(
        (response: any) => {
          console.log(response)

          resolve(SearchDto.format(response));
        },
        (error) => {
          console.log(error)

          reject([]);
        },
      );
    })

  }
  async getLocation(name: string = ''): Promise<unknown> {

    const params = {
      "idCochera": 0,
      "idPersona": 0,
      "idUbicacion": 0,
      "ubicacion": name,
      "nombre": "",
      "idUsuarioModificacion": 0,
      "estado": 0,
      "fechaInicio": "",
      "fechaFin": "",
      "numeroPagina": 1,
      "totalPorPagina": 20
    }
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
    );

    return new Promise(async (resolve, reject) => {
      await this.http.post(`/api/Cochera/ObtenerPorConcepto`, JSON.stringify(params), {headers}).subscribe(
        (response: any) => {
          console.log(response)

          resolve(SearchDto.format(response));
        },
        (error) => {
          console.log(error)

          reject([]);
        },
      );
    })

  }
  async getByGarageId(garageId: number = 0): Promise<unknown> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
    );
    return new Promise(async (resolve, reject) => {
      await this.http.get(`/api/Cochera/${garageId}`, {headers}).subscribe(
        (response: any) => {
          console.log(response)
          resolve(GarageDetailDto.format(response));
        },
        (error) => {
          console.log(error)
          reject([]);
        },
      );
    })

  }

}

