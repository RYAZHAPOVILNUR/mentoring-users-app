import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LetDirective } from '@ngrx/component';
import { Folder, FoldersFacade } from '@users/data-access-folder';
import { filter, tap } from 'rxjs';

import { FolderAddButtonComponent } from '../folder-add-button/folder-add-button.component';
import { FolderListComponent } from '../folder-list/folder-list.component';
import { ConfirmFolderDialogService } from '../ui/services/confirm-dialog.service';
import { FolderDialogService } from '../ui/services/folder-dialog.service';

@Component({
  templateUrl: './folder-list-container.component.html',
  styleUrl: './folder-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

  imports: [CommonModule, FolderListComponent, FolderAddButtonComponent, LetDirective, MatProgressBarModule],
})
export class FolderListContainerComponent implements OnInit {
  public readonly dialog = inject(MatDialog);
  public readonly foldersFacade = inject(FoldersFacade);
  public readonly confirmFolderDialogService = inject(ConfirmFolderDialogService);
  public readonly folderDialogService = inject(FolderDialogService);

  public readonly folders$ = this.foldersFacade.folders$;
  public readonly status$ = this.foldersFacade.status$;

  ngOnInit(): void {
    this.foldersFacade.loadFolders();
  }
  addFolderClick(): void {
    const dialogRef = this.folderDialogService.open();

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((folder) => this.foldersFacade.publishFolder(folder)),
      )
      .subscribe();
  }

  deleteFolderClick(folder: Folder) {
    const dialogRef = this.confirmFolderDialogService.openDeleteFolderConfirmDialog(folder);

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap(() => this.foldersFacade.deleteFolder(folder.id)),
      )
      .subscribe();
  }
}
