import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface FolderData {
  id: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class MaterialsState {
  private readonly deleteFolder$$ = new Subject<number>();
  private readonly openFolder$$ = new Subject<FolderData>();
  private readonly deleteMaterial$$ = new Subject<number>();
  private readonly openMaterial$$ = new Subject<number>();

  readonly deleteFolder$ = this.deleteFolder$$.asObservable();
  readonly openFolder$ = this.openFolder$$.asObservable();
  readonly deleteMaterial$ = this.deleteMaterial$$.asObservable();
  readonly openMaterial$ = this.openMaterial$$.asObservable();

  deleteFolder(id: number): void {
    this.deleteFolder$$.next(id);
  }

  openFolder(id: number, title: string): void {
    this.openFolder$$.next({ id, title });
  }

  openMaterial(id: number): void {
    this.openMaterial$$.next(id);
  }

}