import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { Folder, MaterialsFacade, showSnackbarType } from '@users/materials/data-access';
import { FoldersAddButtonComponent } from '@users/feature-folders-create';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'folders-list-container',
  standalone: true,
  imports: [CommonModule, LetDirective, FoldersListComponent, FoldersAddButtonComponent, MatSnackBarModule],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router)
  public readonly allFolders$ = this.materialsFacade.allFolders$;
  public readonly loadingStatus$ = this.materialsFacade.loadingStatus$;

  constructor() {
    this.materialsFacade.init();
  }

  onDeleteFolder(folder: Folder, showSnackbarDeleteFolderSuccess: showSnackbarType) {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить «${folder.title}»?` },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.materialsFacade.deleteFolder(folder.id, showSnackbarDeleteFolderSuccess);
      }
    });
  }

  onRedirectToMaterialsPage(id: number) {
    this.router.navigate(['/materials/', id])
  }
}
