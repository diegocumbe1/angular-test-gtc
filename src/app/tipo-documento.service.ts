import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoDocumento } from './tipo-documento';

@Injectable({
  providedIn: 'root',
})
export class TipoDocumentoService {
  private apiUrl = 'http://localhost:8080/api/tipodocumento';

  constructor(private http: HttpClient) {}

  getTipoDocumento(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(this.apiUrl);
  }
}
