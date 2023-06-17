import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReservationDto} from "./dto/reservation.dto";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }


  add(reservation: ReservationDto): Observable<any> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
    );
    return this.http.post(`/api/Reserva`, JSON.stringify(reservation), { headers });
  }
}
