import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Folder, MaterialsFacade } from '@users/materials/data-access';
import { FolderDialogComponent } from '../folder-dialog/folder-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddButtonComponent{
  readonly dialog = inject(MatDialog);
  private materialsFacade = inject(MaterialsFacade);

  addFolder() {
    const dialogRef = this.dialog.open(FolderDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const folder: Folder = { id: Date.now(), title: result, createdAt: new Date().toISOString()};
        this.materialsFacade.loadFolder(folder)
      }
    });
  };
}
