import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { MaterialsFacade } from '../../../../data-access/src/lib/+state/materials.facade';
import { LetDirective } from '@ngrx/component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddFolderModalComponent } from '../add-folder-modal/add-folder-modal.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ConfirmCustomModalComponent
} from '../../../../../../core/ui/src/lib/confirm-custom-modal/confirm-custom-modal.component';
import { MaterialsService } from '../../../../service/materialsService';
import { tap } from 'rxjs';
import { DELETE_ITEM_TYPE, MODAL_CONFIRM_TEXT } from '../../../../util/constant';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IDeleteItem } from '../../../../data-access/src/lib/models/models';

@Component({
  selector: 'lib-materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsListComponent, LetDirective, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  public readonly folders$ = this.materialsFacade.folders$;
  public readonly isLoading$ = this.materialsFacade.isLoadingFolders$;
  public dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private materialService = inject(MaterialsService);

  constructor() {
    this.materialsFacade.loadMaterialFolders();

    this.materialService.deleteItem.pipe(
      tap((folder: IDeleteItem): void => {
          if (!folder.deleteId && folder.type !== DELETE_ITEM_TYPE.FOLDER) return;
          this.deleteFolder(folder);
        }
      )
    ).subscribe();
  }

  openAddFolderDialog(): void {
    const addFolderRef: MatDialogRef<AddFolderModalComponent> = this.dialog.open(AddFolderModalComponent);
    addFolderRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .pipe(
        tap(({ folderName }): void => {
          if (!folderName) return;
          this.materialsFacade.addNewFolder(folderName);
          this.materialService.openSnackBar(`Folder ${folderName} was added`);
        })
      )
      .subscribe();
  }

  deleteFolder(folder: IDeleteItem) {
    const deleteFolderRef: MatDialogRef<ConfirmCustomModalComponent> = this.dialog.open(ConfirmCustomModalComponent, {
      data: {
        dialogDescription: MODAL_CONFIRM_TEXT.FOLDER_DELETE.DESCRIPTION,
        dialogButtonText: MODAL_CONFIRM_TEXT.FOLDER_DELETE.BUTTON_TEXT
      }
    });
    deleteFolderRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .pipe(
        tap(confirmDelete => {
          if (!confirmDelete) return;
          this.materialsFacade.deleteFolder(folder);
          this.materialService.openSnackBar(`Folder ${folder.title} was removed`);
          this.materialService.setZeroItem();
        })
      )
      .subscribe();
  }
}
