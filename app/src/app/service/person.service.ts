import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PersonModel} from "./model/person.model";
import {VehiclesModel} from "./model/vehicles.model";
import {Vehicles, VehiclesDto} from "./dto/vehicles.dto";
import {ReservationDto} from "./dto/reservation.dto";
import {DateTimeDto} from "./dto/date-time.dto";

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  headers: HttpHeaders
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
    )
  }

  add(person: PersonModel): Observable<any> {
    return this.http.post(`/api/Persona`, JSON.stringify(person), { headers: this.headers });
  }

  async saveReservation(vehiclesModel: VehiclesModel, garageId: number, startDate:string, endDate: string): Promise<unknown> {
    return await new Promise(async (resolve, reject) => {
      await this.http.post(`/api/Vehiculo`, JSON.stringify(vehiclesModel), { headers: this.headers }).subscribe(
        async (response: any) => {
          const vehicles: Vehicles[] = await this.getVehiclesAll(await response.idPersona)
          console.log(response)
          console.log(JSON.stringify(vehiclesModel))
          await this.addReservation( {
            idCochera: garageId,
            idVehiculo: vehicles[vehicles.length - 1].idVehiculo,
            fechaReserva: startDate,
            horaInicioReserva: String(DateTimeDto.hour(startDate)),
            horaFinReserva: String(DateTimeDto.hour(endDate)),
            precioPorHora: 15,
            totalHorasReserva: 1,
            totalAPagar: 0
          }).subscribe(
            (response)=> {
                console.log(response)
            },
            (error) =>{
              console.log(error)

          })
        },
        (error) => {
          reject(0);
        },
      );
    })
  }

  async getVehiclesAll(personId: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const body = {
        "idVehiculo": 0,
        "idPersona": personId,
        "marca": "",
        "modelo": "string",
        "color": "",
        "numeroPlaca": "",
        "descripcion": "",
        "idUsuarioModificacion": 0,
        "fechaInicio": "",
        "fechaFin": ""
      }
      await this.http.post(`/api/Vehiculo/ObtenerPorConcepto`, JSON.stringify(body), { headers: this.headers }).subscribe(
        (response: any) => {
          console.log(response)
          resolve(response as Vehicles[]);
        },
        (error) => {
          reject([]);
        },
      );
    })
  }

  addReservation(reservation: ReservationDto): Observable<any> {
    console.log(reservation)
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
    );
    return this.http.post(`/api/Reserva`, JSON.stringify(reservation), { headers });
  }

  async getById(personId: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.http.get(`/api/Persona/${personId}`, { headers: this.headers }).subscribe(
        (response: any) => {
          resolve(PersonModel.create(
            response.nombres,
            response.apellidos,
            response.razonSocial,
            response.idTipoDocumento,
            response.numeroDocumento,
            response.numeroCelular,
            response.direccion,
            response.logo
          ));
        },
        (error) => {
          reject([]);
        },
      );
    })
  }

  async update(personId: number, person: PersonModel): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.http.put(`/api/Persona/${personId}`,JSON.stringify(person), { headers: this.headers }).subscribe(
        (response: any) => {
          console.log(response)
          resolve(response);
        },
        (error) => {
          reject([]);
        },
      );
    })
  }
}
