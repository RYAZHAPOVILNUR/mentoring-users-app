import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { LetDirective } from '@ngrx/component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FolderDTO, FoldersFacade } from '@users/materials/data-access';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { FoldersAddButtonComponent } from '@users/feature-folders-create';
import { Router } from '@angular/router';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [
    CommonModule,
    FoldersCardComponent,
    FoldersListComponent,
    LetDirective,
    MatProgressBarModule,
    FoldersAddButtonComponent,
  ],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
})
export class FoldersListContainerComponent {
  public folderFacade = inject(FoldersFacade);

  public readonly folders$ = this.folderFacade.allFolders$;
  public readonly status$ = this.folderFacade.status$;
  public readonly errors$ = this.folderFacade.errors$;

  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  constructor() {
    this.folderFacade.init();
  }

  public deleteFolder(folder: FolderDTO): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${folder.title}` },
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((result: boolean) => {
          if (result) this.folderFacade.deleteFolder(folder.id);
        })
      )
      .subscribe();
  }
  onOpenFolder(id: number) {
    this.router.navigate(['/materials', id]);
  }
}
