import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../interfaces/confirm-dialog-data.interface';

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  private readonly dialog = inject(MatDialog);

  private readonly defaultData: Partial<ConfirmDialogData> = {
    primaryButtonText: 'Да',
    primaryButtonAppearance: 'primary',
    secondaryButtonText: 'Нет',
    secondaryButtonAppearance: '',
  };

  open(data: ConfirmDialogData): MatDialogRef<ConfirmDialogComponent, true> {
    return this.dialog.open<ConfirmDialogComponent, ConfirmDialogData, true>(ConfirmDialogComponent, {
      data: { ...this.defaultData, ...data },
    });
  }
}
