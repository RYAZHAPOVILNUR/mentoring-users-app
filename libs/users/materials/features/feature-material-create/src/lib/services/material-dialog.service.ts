import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Injectable()
export class MaterialDialogService {
  public readonly dialog = inject(MatDialog);

  open<T, D, R = void>(component: ComponentType<T>, config: MatDialogConfig<D>): MatDialogRef<T, R> {
    return this.dialog.open<T, D, R>(component, { ...config });
  }
}
