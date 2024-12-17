import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';
import { FoldersFacade, IFolder } from '@users/materials/data-access';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { LetDirective } from '@ngrx/component';
import { MatDialog } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersAddButtonComponent, FoldersListComponent, LetDirective],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent {
  private readonly foldersFacade = inject(FoldersFacade);
  public readonly allFolders$ = this.foldersFacade.allFolders$;
  public readonly foldersStatus$ = this.foldersFacade.foldersStatus$;
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  constructor() {
    this.foldersFacade.loadFolders();
  }

  public openFolder(id: number) {
    this.router.navigate([`/materials/`, id]);
  }

  public deleteFolder(folder: IFolder): void {
    const dialogRef = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены что хотите удалить папку ${folder.title}` },
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((result: boolean) => {
          if (result) {
            this.foldersFacade.deleteFolder(folder.id);
          }
        })
      )
      .subscribe();
  }
}
