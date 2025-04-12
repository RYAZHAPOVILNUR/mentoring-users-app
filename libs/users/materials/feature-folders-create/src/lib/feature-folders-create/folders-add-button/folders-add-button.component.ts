import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { newFolder, MaterialsFacade } from '@users/materials/data-access'

@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddButtonComponent {
  
  readonly dialog = inject(MatDialog);
  private readonly materialsFacade = inject(MaterialsFacade);
  folder: newFolder | undefined;

  openFolderAddDialog(folder?: newFolder): void {
    const dialogRef = this.dialog.open(FoldersAddDialogComponent, {
      data: {folder}
    });

    dialogRef.afterClosed().subscribe(folder => {
      if (folder) {
        this.materialsFacade.createFolder(folder)
      }
    });
  }
}
