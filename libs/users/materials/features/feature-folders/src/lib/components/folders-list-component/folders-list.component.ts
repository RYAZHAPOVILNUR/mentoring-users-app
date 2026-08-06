import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatTooltip } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { filter, tap } from 'rxjs';

import { FoldersFacade } from '@users/materials/data-access-folders';
import { OpenCreateFolderDialogService } from '@users/materials/util-folders';
import { ConfirmDeleteDialogService } from '@users/shared';
import { Folder } from '@users/ui-folders';

import { FoldersCardComponent } from './folders-card/folders-card.component';

@Component({
  selector: 'users-folders-list',
  imports: [CommonModule, FoldersCardComponent, MatIconModule, MatProgressBar, MatFabButton, MatTooltip],
  templateUrl: './folders-list.component.html',
  styleUrl: './folders-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  private readonly foldersFacade = inject(FoldersFacade);
  private readonly router = inject(Router);
  private readonly deleteFolderDialogService = inject(ConfirmDeleteDialogService);
  private readonly openCreateFolderDialogService = inject(OpenCreateFolderDialogService);
  public readonly isLoadingStatus = this.foldersFacade.isLoadingStatus$;
  public readonly folders$ = this.foldersFacade.folders$;

  constructor() {
    this.foldersFacade.loadFolders();
  }
  deleteFolder({ title, id }: Folder) {
    const dialogRef = this.deleteFolderDialogService.openDeleteFolderDialog(title);

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap(() => this.foldersFacade.deleteFolder(id)),
      )
      .subscribe();
  }

  onCreateFolderButtonClick() {
    const dialogRef = this.openCreateFolderDialogService.open();

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((title) => this.foldersFacade.createFolder(title)),
      )
      .subscribe();
  }

  openFolder(folder: Folder) {
    this.router.navigate(['/materials', folder.id]);
  }
}
