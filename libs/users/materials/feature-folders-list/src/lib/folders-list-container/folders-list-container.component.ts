import { ChangeDetectionStrategy, Component, DestroyRef, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersFacade } from '../../../../data-access/src/lib/+state/folders/folders.facade';
import { LetDirective } from '@ngrx/component';
import { FoldersAddButtonComponent } from '../../../../feature-foders-create/src/lib/folders-add-button/folders-add-button.component';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { Store } from '@ngrx/store';
import { Folder } from 'libs/users/materials/data-access/src/lib/models/folders.interface';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, LetDirective, FoldersCardComponent, FoldersAddButtonComponent, MatProgressBarModule],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class FoldersListContainerComponent {
  private readonly foldersFacade = inject(FoldersFacade);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  public readonly folders$ = this.foldersFacade.allFolders$;
  public readonly status$ = this.foldersFacade.status$;
  public readonly error$ = this.foldersFacade.error$;
  private readonly destroyRef = inject(DestroyRef);
  constructor(public store: Store) {
    this.foldersFacade.load();
  }

  openFolder(folder: Folder): void {
    this.router.navigate(['materials', folder.id], {
      queryParams: { folderTitle: folder.title },
    });
  }

  onDeleteFolder(folder: Folder): void {
    const dialogRef = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${folder.title}` },
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((result) => {
          if (result) {
            this.foldersFacade.deleteFolder(folder.id);
          }
        })
      )
      .subscribe();
  }
}
