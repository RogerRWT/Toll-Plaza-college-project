import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateTollLogRequest,
  FlagTollLogRequest,
  TollLog,
} from '../models/toll-log.interface';

@Injectable({ providedIn: 'root' })
export class TollLogService {
  private readonly apiUrl = 'http://localhost:3000/logs';

  constructor(private readonly http: HttpClient) {}

  getLogs(): Observable<TollLog[]> {
    return this.http.get<TollLog[]>(this.apiUrl);
  }

  createLog(payload: CreateTollLogRequest): Observable<TollLog> {
    return this.http.post<TollLog>(this.apiUrl, payload);
  }

  flagLog(id: string, payload: FlagTollLogRequest): Observable<TollLog> {
    return this.http.patch<TollLog>(`${this.apiUrl}/${id}/flag`, payload);
  }
}
