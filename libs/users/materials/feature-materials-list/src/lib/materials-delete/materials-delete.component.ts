import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'users-materials-delete',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './materials-delete.component.html',
  styleUrls: ['./materials-delete.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsDeleteComponent {
  data = inject(MAT_DIALOG_DATA)
  dialogRef = inject(MatDialogRef<MaterialsDeleteComponent>)

  del() {
    this.dialogRef.close(true)
  }
}
