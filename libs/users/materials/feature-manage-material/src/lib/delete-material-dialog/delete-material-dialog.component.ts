import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-delete-material-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule],
  templateUrl: './delete-material-dialog.component.html',
  styleUrls: ['./delete-material-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteMaterialDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<DeleteMaterialDialogComponent>);
  public readonly dialogData = inject(MAT_DIALOG_DATA);

  public delete() {
    this.dialogRef.close(this.dialogData.id);
  }
}
