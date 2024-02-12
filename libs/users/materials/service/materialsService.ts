import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MaterialsService {
  private readonly folderId$ = new Subject<number>();

  public get folderId(): Observable<number> {
    return this.folderId$.asObservable();
  }

  public setFolderId(id: number): void {
    this.folderId$.next(id);
  }
}
