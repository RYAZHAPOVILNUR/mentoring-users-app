import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-materials-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './materials-delete-dialog.component.html',
  styleUrls: ['./materials-delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsDeleteDialogComponent {
  private readonly dialog = inject(MatDialogRef<MaterialsDeleteDialogComponent>);

  onConfirm() {
    this.dialog.close(true);
  }

  onCancel() {
    this.dialog.close(false);
  }
}
