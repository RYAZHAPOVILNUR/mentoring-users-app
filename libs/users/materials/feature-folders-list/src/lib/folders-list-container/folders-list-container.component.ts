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
  public folders$ = this.foldersFacade.allFolders$;
  public status$ = this.foldersFacade.selectStatus$;
  public errors$ = this.foldersFacade.selectErrors$;
  public dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.foldersFacade.init();
  }

  public onAddFolderClick() {
    const dialogRef: MatDialogRef<FoldersAddDialogComponent> = this.dialog.open(
      FoldersAddDialogComponent,
      {
        width: '300px',
        height: '200px',
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
}
