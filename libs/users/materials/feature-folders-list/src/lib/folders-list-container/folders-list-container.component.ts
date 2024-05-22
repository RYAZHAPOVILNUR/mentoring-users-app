import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { FoldersFacade, MaterialsFacade } from '@materials/data-access';
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
  private readonly materialsFacade = inject(MaterialsFacade);
  public readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  public readonly folders$ = this.foldersFacade.allFolders$;
  public readonly status$ = this.foldersFacade.selectStatus$;
  public readonly errors$ = this.foldersFacade.selectErrors$;
  public readonly materials$ = this.materialsFacade.selectMaterialsInFolder$;

  constructor() {
    this.foldersFacade.init();
    this.materialsFacade.init();
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

  public onFolderClick(folder: FolderDTO) {
    this.materialsFacade.setOpenedFolderId(folder.id);
    this.router.navigate(['materials/', folder.id]);
  }
}
