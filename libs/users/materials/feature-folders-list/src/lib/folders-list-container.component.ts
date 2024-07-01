import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FoldersListUiComponent } from './components/folders-list-ui/folders-list-ui.component';
import { LetDirective } from '@ngrx/component';
import { MaterialsFacade } from '@users/materials/data-access';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, Observable, switchMap, tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AddFolderDialogUiComponent } from './components/add-folders-dialog-ui/add-folder-dialog-ui.component';

@Component({
  standalone: true,
  imports: [
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
  readonly materialsFacade = inject(MaterialsFacade);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  constructor() {
    this.materialsFacade.loadFolders();
    this.initHandlers();
  }

  private initHandlers(): void {
    this.initDeleteFolderHandler();
    this.initOpenFolderHandler();
    this.initCreateFolderHandler();
  }

  initOpenFolderHandler(): void {
    this.materialsFacade.folderOpen$.pipe(
      tap((id) => this.router.navigate(
        ['/material', id]
      )),
      takeUntilDestroyed()
    ).subscribe();
  }

  initDeleteFolderHandler(): void {
    this.materialsFacade.folderDelete$.pipe(
      tap((id) => this.materialsFacade.deleteFolder(id)),
      takeUntilDestroyed()
    ).subscribe();
  }

  initCreateFolderHandler(): void {
    this.materialsFacade.folderCreateDialogOpen$.pipe(
      switchMap(this.openCreateDialog.bind(this)),
      tap((title) => this.materialsFacade.createFolder(title)),
      takeUntilDestroyed()
    ).subscribe();
  }

  private openCreateDialog(): Observable<string> {
    const dialogRef = this.dialog
      .open<AddFolderDialogUiComponent, never, string>(AddFolderDialogUiComponent);

    return dialogRef.afterClosed().pipe(filter(Boolean));
  }
}