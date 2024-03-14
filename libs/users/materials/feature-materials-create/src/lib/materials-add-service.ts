import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MaterialsAddService {
  private _dialogTitleSource = new BehaviorSubject<string>('Создать файл');
  public dialogTitle$ = this._dialogTitleSource.asObservable();

  updateDialogTitle(newTitle: string): void {
    this._dialogTitleSource.next(newTitle);
  }
}
