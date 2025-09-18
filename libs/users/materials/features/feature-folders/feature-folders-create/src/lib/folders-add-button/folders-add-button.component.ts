import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFabButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { filter } from 'rxjs';

import { AddFolder, FoldersFacade } from '@users/materials/data-access-folders';

import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';

@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [CommonModule, MatFabButton, MatTooltip, MatIcon],
  templateUrl: './folders-add-button.component.html',
  styleUrl: './folders-add-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddButtonComponent {
  private readonly dialog = inject(MatDialog);
  private readonly foldersFacade = inject(FoldersFacade);
  private readonly destroyRef = inject(DestroyRef);

  openDialog(): void {
    const dialogRef = this.dialog.open(FoldersAddDialogComponent);

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef), filter(Boolean))
      .subscribe((result: string) => {
        const newFolder: AddFolder = {
          title: result,
        };
        this.foldersFacade.addFolder(newFolder);
      });
  }
}
