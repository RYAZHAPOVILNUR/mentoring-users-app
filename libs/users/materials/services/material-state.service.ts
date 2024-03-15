import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Folder } from '../data-access';

@Injectable({ providedIn: 'root' })
export class MaterialStateService {
  private readonly deleteFolder$$ = new Subject<Omit<Folder, 'created_at'>>();
  private readonly openFolder$$ = new Subject<number>();

  public get deleteFolder$() {
    return this.deleteFolder$$.asObservable();
  }

  public updateDeleteFolder(data: Omit<Folder, 'created_at'>) {
    this.deleteFolder$$.next(data);
  }

  public get openFolder$() {
    return this.openFolder$$.asObservable();
  }

  public updateOpenFolder(data: number) {
    this.openFolder$$.next(data);
  }
}
