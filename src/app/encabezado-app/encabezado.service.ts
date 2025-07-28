import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Encabezado } from './encabezado';

@Injectable({
  providedIn: 'root'
})
export class EncabezadoService {

  private apiUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

 darRolUsuario(token: string): Observable<any> {
  const url = `${this.apiUrl}/auth/verify-token`;
  const body = { token };
  return this.http.post<any>(url, body);
}

}
