import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreateMaterial, DialogData } from '@users/ui-materials';

import { CreateMaterialDialogComponent } from './create-material-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class OpenCreateMaterialDialogService {
  private readonly dialog = inject(MatDialog);
  open(data: DialogData) {
    return this.dialog.open<CreateMaterialDialogComponent, DialogData, CreateMaterial>(CreateMaterialDialogComponent, {
      data,
    });
  }
}
