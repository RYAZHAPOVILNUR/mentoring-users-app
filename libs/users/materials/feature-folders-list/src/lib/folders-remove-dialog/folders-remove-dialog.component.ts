import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IFolder } from '@users/materials/data-access';

@Component({
  selector: 'users-folders-remove-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './folders-remove-dialog.component.html',
  styleUrls: ['./folders-remove-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersRemoveDialogComponent {
  public dialogRef = inject(MatDialogRef<FoldersRemoveDialogComponent>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: { folder: IFolder }) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }
  onDelete(): void {
    this.dialogRef.close(true);
  }
}
