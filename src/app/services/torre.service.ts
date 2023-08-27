import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Torre } from '../models/torres';

@Injectable({
  providedIn: 'root',
})
export class TorresService {
  private apiUrl = 'https://expresback.onrender.com/api/torres';

  constructor(private http: HttpClient) {}

  obtenerTorres(): Observable<Torre[]> {
    return this.http.get<Torre[]>(this.apiUrl);
  }

}
