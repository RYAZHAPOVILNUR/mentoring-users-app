import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialContentDialogComponent } from '@users/feature-material-content-dialog';

import { CreateMaterialDialogComponent } from '../dialogs/create-material-dialog/create-material-dialog.component';
import { CreateDialogCloseData } from '../types/create-dialog-close-data.type';
import { CreateDialogData } from '../types/create-dialog-data.type';
import { ViewDialogCloseData } from '../types/view-dialog-close-data.type';
import { ViewDialogData } from '../types/view-dialog-data.type';

@Injectable({ providedIn: 'root' })
export class MaterialDialogService {
  private readonly dialog = inject(MatDialog);

  public openCreateDialog(data: CreateDialogData): MatDialogRef<CreateMaterialDialogComponent, CreateDialogCloseData> {
    return this.dialog.open<CreateMaterialDialogComponent, CreateDialogData, CreateDialogCloseData>(
      CreateMaterialDialogComponent,
      {
        data,
      },
    );
  }

  public openViewDialog(data: ViewDialogData): MatDialogRef<MaterialContentDialogComponent, ViewDialogCloseData> {
    return this.dialog.open<MaterialContentDialogComponent, ViewDialogData, ViewDialogCloseData>(
      MaterialContentDialogComponent,
      {
        data,
      },
    );
  }
}
