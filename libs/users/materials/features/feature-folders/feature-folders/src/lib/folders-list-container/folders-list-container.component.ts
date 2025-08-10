import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LetDirective } from '@ngrx/component';

import { CoreUiConfirmDialogComponent } from '@core/ui-core';
import { CreateFolder, Folder, FoldersFacade } from '@users/data-access-folders';
import { FoldersAddButtonComponent, FoldersAddDialogComponent } from '@users/feature-folders-create';

import { FoldersListComponent } from '../folders-list/folders-list.component';

@Component({
  templateUrl: './folders-list-container.component.html',
  styleUrl: './folders-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
  imports: [CommonModule, FoldersListComponent, FoldersAddButtonComponent, LetDirective, MatProgressBarModule],
})
export class FoldersListContainerComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  public readonly foldersFacade = inject(FoldersFacade);

  public readonly folders$ = this.foldersFacade.folders$;
  public readonly status$ = this.foldersFacade.status$;

  ngOnInit(): void {
    this.foldersFacade.loadFolders();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(FoldersAddDialogComponent);

    dialogRef.afterClosed().subscribe((folder: CreateFolder | undefined) => {
      if (folder) {
        this.foldersFacade.publishFolder(folder);
      }
    });
  }

  deleteFolder(folder: Folder) {
    const dialogRef = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить папку "${folder.title}"?` },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.foldersFacade.deleteFolder(folder.id);
      }
    });
  }
}
