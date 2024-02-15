import { Observable, Subject } from 'rxjs';
import { Component, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { IDeleteItem } from '../data-access/src/lib/models/models';
import { DELETE_ITEM_TYPE } from '../util/constant';

@Injectable({ providedIn: 'root' })
@Component({
  template: '',
  standalone: true,
  imports: [MatSnackBarModule]
})
export class MaterialsService {
  private readonly deleteItem$: Subject<IDeleteItem> = new Subject<IDeleteItem>();

  constructor(private readonly snackBar: MatSnackBar) {
  }

  public get deleteId(): Observable<IDeleteItem> {
    return this.deleteItem$.asObservable();
  }

  public setDeleteId(deleteItem: IDeleteItem): void {
    this.deleteItem$.next(deleteItem);
  }

  public setZeroId(): void {
    this.deleteItem$.next({ deleteId: 0, title: '', type: DELETE_ITEM_TYPE.EMPTY });
  }

  public openSnackBar(snackBarLabel: string): void {
    this.snackBar.open(snackBarLabel,
      'Dismiss', {
        duration: 3000
      });
  }
}
