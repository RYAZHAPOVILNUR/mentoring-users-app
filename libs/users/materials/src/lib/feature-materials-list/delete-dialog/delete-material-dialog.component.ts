import { Component, inject } from '@angular/core';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Material } from 'libs/users/materials/data-access/src/lib/folders-materials-types/folders-materials-types';

@Component({
  selector: 'material-delete',
  templateUrl: './delete-material-dialog.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class MaterialsDeleteDialogComponent {
  dialog = inject(MatDialog);
  dialogRef = inject(MatDialogRef<MaterialsDeleteDialogComponent>);
  dialogData: { material: Material } = inject(MAT_DIALOG_DATA);

  closeDialog(id?: number): void {
    this.dialogRef.close(id);
  }
}
