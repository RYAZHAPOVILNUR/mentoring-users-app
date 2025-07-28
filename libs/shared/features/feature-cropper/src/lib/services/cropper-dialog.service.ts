import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { CropperDialogComponent } from '../dialogs/cropper-dialog/cropper-dialog.component';
import { CropperDialogData } from '../interfaces/cropper-dialog-data.interface';
import { CropperDialogCloseData } from '../types/cropper-dialog-close-data.type';

@Injectable({ providedIn: 'root' })
export class CropperDialogService {
  private readonly dialog = inject(MatDialog);

  open(data: CropperDialogData): MatDialogRef<CropperDialogComponent, CropperDialogCloseData> {
    return this.dialog.open<CropperDialogComponent, CropperDialogData, CropperDialogCloseData>(CropperDialogComponent, {
      data,
    });
  }
}
