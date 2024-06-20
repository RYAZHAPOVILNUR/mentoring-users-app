import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListUiComponent } from './components/folders-list-ui/folders-list-ui.component';
import { LetDirective } from '@ngrx/component';
import { FoldersFacade } from '@users/materials/data-access';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AddFolderDialogUiComponent } from './components/add-folders-dialog-ui/add-folder-dialog-ui.component';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    FoldersListUiComponent,
    LetDirective,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersListContainerComponent {
  readonly foldersFacade = inject(FoldersFacade);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  constructor() {
    this.foldersFacade.loadFolders();
    this.deleteFolderHandler();
    this.openFolderHandler();
  }

  onAddButtonClick(): void {
    const dialogRef = this.dialog
      .open<AddFolderDialogUiComponent, never, string>(AddFolderDialogUiComponent);
    dialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        tap((title) => this.foldersFacade.createFolder(title)),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe();
  }

  deleteFolderHandler(): void {
    this.foldersFacade.deleteFolder$.pipe(
      tap((id) => this.foldersFacade.deleteFolder(id)),
      takeUntilDestroyed()
    ).subscribe();
  }

  openFolderHandler(): void {
    this.foldersFacade.openFolder$.pipe(
      tap((id) => this.router.navigate(
        ['/material', id]
      )),
      takeUntilDestroyed()
    ).subscribe();
  }


}
