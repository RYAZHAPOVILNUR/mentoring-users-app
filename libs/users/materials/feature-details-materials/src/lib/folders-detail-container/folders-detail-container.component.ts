import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsersErrors, UsersFacade, onSuccessAddStoryPointsCbType, onSuccessEditionCbType } from '@users/users/data-access';
import { Observable, map, tap } from 'rxjs';
import { selectQueryParam, CreateUserDTO, UsersEntity, usersDTOAdapter, FolderEntity, CreateFolderDTO } from '@users/core/data-access';
import { Store, select } from '@ngrx/store';
import { LetDirective } from '@ngrx/component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FoldersError, MaterialsFacade } from '@users/materials/data-access';
import { DetailFoldersCardComponent } from "../folders-detail-card/detail-folders-card.component";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'folders-detail',
  standalone: true,
  imports: [CommonModule, MatDialogModule, LetDirective, DetailFoldersCardComponent],
  templateUrl: './folders-detail-container.component.html',
  styleUrls: ['./folders-detail-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersDetailComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  public folder!: FolderEntity;
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  public readonly folder$: Observable<FolderEntity | null> = this.materialsFacade.openedFolder$.pipe(
    tap((folder) => {
      if (!folder) {
        this.materialsFacade.loadFolder();
      } else {
        this.folder = folder;
      }
    })
  );
  public readonly status$ = this.materialsFacade.status$;
  public readonly editMode$: Observable<boolean> = this.store.pipe(
    select(selectQueryParam('edit')),
    map((params) => params === 'true')
  );
  public readonly errors$: Observable<FoldersError | null> = this.materialsFacade.errors$;

  public onEditFolder(folderData: FolderEntity, onSuccessCb: onSuccessEditionCbType) {
    this.materialsFacade.editFolder(folderData, this.folder.id, onSuccessCb);
    this.router.navigate(['/materials', this.folder.id], {
      queryParams: { edit: false },
    });
  }

  onCloseFolder() {
    this.router.navigate(['/materials']);
  }

  onCloseEditMode() {
    this.router.navigate(['/materials', this.folder.id], {
      queryParams: { edit: false },
    });
  }

  onOpenEditMode() {
    this.router.navigate(['materials', this.folder.id], {
      queryParams: { edit: true },
    });
  }

  onDeleteFolder() {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: {
        dialogText: `Вы уверены, что хотите удалить ${this.folder.title}`,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          this.materialsFacade.deleteFolder(this.folder.id);
          this.router.navigate(['/home']);
        }
      });
  }
}
