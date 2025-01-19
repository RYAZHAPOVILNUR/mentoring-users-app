import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-folders-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './folders-delete-dialog.component.html',
  styleUrls: ['./folders-delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersDeleteDialogComponent {
  private readonly dialog = inject(MatDialogRef<FoldersDeleteDialogComponent>);

  onConfirm() {
    this.dialog.close(true);
  }

  onCancel() {
    this.dialog.close(false);
  }
}
