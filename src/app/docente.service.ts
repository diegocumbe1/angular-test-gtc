import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Docente } from './docente';

@Injectable({
  providedIn: 'root',
})
export class DocenteService {
  private docent = 'http://localhost:8080/api/docentes'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  getDocentes(): Observable<Docente[]> {
    return this.http.get<Docente[]>(this.docent);
  }

  postDocente(data: Object): Observable<Docente> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Docente>(this.docent, data, { headers });
  }

  deleteDocente(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.docent}/${id}`;
    return this.http.delete(url, { headers });
  }
  updateDocente(id: number, docente: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.docent}/${id}`;
    return this.http.put(url, docente, { headers });
  }
}
