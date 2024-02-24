import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialFolderDialogComponent } from '../material-folder-dialog/material-folder-dialog.component';

@Component({
  selector: 'users-material-folder-add-btn',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './material-folder-add-btn.component.html',
  styleUrls: ['./material-folder-add-btn.component.scss'],
})
export class MaterialFolderAddBtnComponent {
  private readonly matDialog = inject(MatDialog);

  openCreateNewFolderModal = () => {
    const dialogRef: MatDialogRef<MaterialFolderDialogComponent> =
      this.matDialog.open(MaterialFolderDialogComponent);
  };
}
