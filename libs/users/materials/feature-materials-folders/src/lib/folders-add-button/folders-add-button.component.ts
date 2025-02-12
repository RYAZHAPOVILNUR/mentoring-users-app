import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Folder, MaterialsFacade } from '@users/materials/data-access';
import { FolderDialogComponent } from '../folder-dialog/folder-dialog.component';

@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
})
export class FoldersAddButtonComponent{
  readonly dialog = inject(MatDialog);
  private materialsFacade = inject(MaterialsFacade);

  addFolder() {
    const dialogRef = this.dialog.open(FolderDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const folder: Folder = { id: Date.now(), title: result, materials: [] , createdAt: new Date().toISOString()};
        this.materialsFacade.loadFolder(folder)
      }
    });
  };
}
