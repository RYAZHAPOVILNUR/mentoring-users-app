import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LetDirective } from '@ngrx/component';
import { filter, tap } from 'rxjs';

import { CoreUiConfirmDialogComponent } from '@core/ui-core';
import { CreateFolder, Folder, FoldersFacade } from '@users/data-access-folder';
import { FolderAddButtonComponent, FolderAddDialogComponent, FolderDialogService } from '@users/feature-folder-create';

import { FolderListComponent } from '../folder-list/folder-list.component';

@Component({
  templateUrl: './folder-list-container.component.html',
  styleUrl: './folder-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FolderDialogService],
  imports: [CommonModule, FolderListComponent, FolderAddButtonComponent, LetDirective, MatProgressBarModule],
})
export class FolderListContainerComponent implements OnInit {
  public readonly foldersFacade = inject(FoldersFacade);
  public readonly folderDialogService = inject(FolderDialogService);
  public readonly folders$ = this.foldersFacade.folders$;
  public readonly status$ = this.foldersFacade.status$;

  ngOnInit(): void {
    this.foldersFacade.loadFolders();
  }
  onPublishFolder(): void {
    const dialogRef = this.folderDialogService.open<FolderAddDialogComponent, boolean, CreateFolder>(
      FolderAddDialogComponent,
    );

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((folder: CreateFolder) => this.foldersFacade.publishFolder(folder)),
      )
      .subscribe();
  }

  onDeleteFolder(folder: Folder) {
    const dialogRef = this.folderDialogService.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить папку "${folder.title}"?` },
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap(() => this.foldersFacade.deleteFolder(folder.id)),
      )
      .subscribe();
  }
}
