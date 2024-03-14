import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IMaterial } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-remove-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './materials-remove-dialog.component.html',
  styleUrls: ['./materials-remove-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsRemoveDialogComponent {
  public dialogRef = inject(MatDialogRef<MaterialsRemoveDialogComponent>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: { material: IMaterial }) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }
  onDelete(): void {
    this.dialogRef.close(true);
  }
}
