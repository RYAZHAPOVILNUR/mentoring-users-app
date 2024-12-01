import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AddFolderDTO, FoldersFacade } from '@users/materials/data-access';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';

@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
})
export class FoldersAddButtonComponent {
  private name!: string;
  public dialog = inject(MatDialog);
  private readonly foldersFacade = inject(FoldersFacade);
  private readonly destroyRef = inject(DestroyRef);

  openAddFolderDialog(): void {
    const dialogRef: MatDialogRef<FoldersAddDialogComponent> = this.dialog.open(FoldersAddDialogComponent, {
      data: { name: this.name },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          const newFolderData: AddFolderDTO = {
            title: result.title,

          };

          this.foldersFacade.addFolder(newFolderData);
        }
      });
  }
}
