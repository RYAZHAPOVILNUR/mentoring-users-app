import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LetDirective } from '@ngrx/component';
import { DeleteFolderData, FolderFacade } from '@users/data-access-folder';
import { FolderAddButtonComponent, FolderDialogService } from '@users/feature-folder-create';
import { filter, tap } from 'rxjs';

import { FolderListComponent } from '../folder-list/folder-list.component';

@Component({
  templateUrl: './folder-list-container.component.html',
  styleUrl: './folder-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FolderListComponent, FolderAddButtonComponent, LetDirective, MatProgressBarModule],
})
export class FolderListContainerComponent implements OnInit {
  private readonly folderFacade = inject(FolderFacade);
  private readonly folderDialogService = inject(FolderDialogService);

  public readonly folders$ = this.folderFacade.folders$;
  public readonly status$ = this.folderFacade.status$;

  ngOnInit(): void {
    this.folderFacade.loadFolders();
  }
  public addFolder(): void {
    const dialogRef = this.folderDialogService.openAddFolder();

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((folder) => this.folderFacade.addFolder(folder)),
      )
      .subscribe();
  }

  public deleteFolder(folder: DeleteFolderData) {
    const dialogRef = this.folderDialogService.openDelete(folder);

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap(() => this.folderFacade.deleteFolder(folder.id)),
      )
      .subscribe();
  }
}
