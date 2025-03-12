import { ChangeDetectionStrategy, Component, DestroyRef, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FolderAddDialogComponent } from '../folder-add-dialog/folder-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AddFolderDTO, FoldersFacade } from '@users/materials/data-access';

@Component({
  selector: 'users-create-folder-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './create-folder-button.component.html',
  styleUrls: ['./create-folder-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFolderButtonComponent {
  private readonly dialog = inject(MatDialog);
  private readonly dialogref = inject(DestroyRef);
  private readonly folderFacade = inject(FoldersFacade);

  onFolderAdd(): void {
    const dialogRef = this.dialog.open(FolderAddDialogComponent);

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.dialogref))
      .subscribe((result) => {
        if (result) {
          console.log('name:', result);
          const folder: AddFolderDTO = {
            id: new Date().getTime(),
            title: result,
            createdAt: new Date().getTime(),
          };
          this.folderFacade.addFolder(folder);
        }
      });
  }
}
