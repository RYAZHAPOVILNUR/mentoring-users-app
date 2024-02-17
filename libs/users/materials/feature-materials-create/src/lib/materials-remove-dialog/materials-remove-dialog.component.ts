import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule, MatIconModule],
  templateUrl: './materials-remove-dialog.component.html',
  styleUrls: ['./materials-remove-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsRemoveDialogComponent {
  public dialogRef: MatDialogRef<MaterialsRemoveDialogComponent> = inject(MatDialogRef<MaterialsRemoveDialogComponent>);
  public dialogData: { materialId: number, materialTitle: string } = inject(MAT_DIALOG_DATA);

  public removeMaterial(result: boolean): void {
    if (result) this.dialogRef.close({ delete: true });
    else this.dialogRef.close({ delete: false });
  }
}
