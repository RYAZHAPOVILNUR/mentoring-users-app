import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UrlCheckerService {
  constructor(private http: HttpClient) {}

  public checkUrlExists(url: string): Observable<boolean> {
    return this.http.head(url).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
