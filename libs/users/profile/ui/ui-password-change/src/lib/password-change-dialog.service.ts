import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { PasswordChangeDialogComponent } from './password-change-dialog/password-change-dialog.component';
import { PasswordChangeDialogCloseData } from './password-change-dialog-close-data.interface';

@Injectable({ providedIn: 'root' })
export class PasswordChangeDialogService {
  private readonly dialog = inject(MatDialog);

  open(): MatDialogRef<PasswordChangeDialogComponent, PasswordChangeDialogCloseData> {
    return this.dialog.open<PasswordChangeDialogComponent, undefined, PasswordChangeDialogCloseData>(
      PasswordChangeDialogComponent,
    );
  }
}
