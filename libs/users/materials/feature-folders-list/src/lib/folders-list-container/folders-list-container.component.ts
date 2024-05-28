import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { FoldersFacade } from '@materials/data-access';
import { LetDirective } from '@ngrx/component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '@users/materials/feature-folders-create';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FolderDTO } from '@users/core/data-access';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { Router } from '@angular/router';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [
    CommonModule,
    FoldersListComponent,
    LetDirective,
    FoldersAddDialogComponent,
  ],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent {
  private readonly foldersFacade = inject(FoldersFacade);
  public readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  public readonly folders$ = this.foldersFacade.allFolders$;
  public readonly status$ = this.foldersFacade.selectStatus$;
  public readonly errors$ = this.foldersFacade.selectErrors$;

  constructor() {
    this.foldersFacade.init();
  }

  public onAddFolderClick() {
    const dialogRef: MatDialogRef<FoldersAddDialogComponent> = this.dialog.open(
      FoldersAddDialogComponent,
      {
        width: '300px',
        height: '230px',
      }
    );

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        result && this.foldersFacade.addFolder(result);
      });
  }

  public onDeeleteClick(folder: FolderDTO) {
    const dialog: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(
      CoreUiConfirmDialogComponent,
      {
        data: { dialogText: `Вы уверены, что хотите удалить ${folder.title}` },
      }
    );

    dialog
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        result && this.foldersFacade.removeFolder(folder.id);
      });
  }
  //добавить резолвер
  public onFolderClick(folder: FolderDTO) {
    this.router.navigate(['materials/', folder.id]);
  }
}
