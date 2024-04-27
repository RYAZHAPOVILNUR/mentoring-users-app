import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { Folder, FoldersFacade } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';
import { FolderCreateButtonComponent } from '@users/feature-folders-create';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, FolderCreateButtonComponent, LetDirective, MatProgressBarModule],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent {
  private readonly foldersFacade = inject(FoldersFacade);

  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  public readonly folders$ = this.foldersFacade.allFolders$;
  public readonly status$ = this.foldersFacade.status$;
  public readonly errors$ = this.foldersFacade.error$;

  constructor() {
    this.foldersFacade.load();
  }

  public deleteFolder(folder: Folder): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${folder.title}` },
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((result: boolean) => {
          if (result) this.foldersFacade.delete(folder.id);
        })
      )
      .subscribe();
  }
}
