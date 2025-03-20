import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LetDirective } from '@ngrx/component';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { FoldersFacade, IFolder, IMaterial, MaterialsFacade } from '@users/materials/data-access';
import { MaterialsAddButtonComponent } from '@users/materials/feature-materials-create';
import { distinctUntilChanged, filter, map } from 'rxjs';
import { MaterialsListComponent } from '../materials-list/materials-list.component';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsAddButtonComponent, MaterialsListComponent, LetDirective],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  providers: [MatSnackBar],
})
export class MaterialsListContainerComponent implements OnInit {
  public readonly MaterialsFacade = inject(MaterialsFacade);
  public readonly foldersFacade = inject(FoldersFacade);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);
  public readonly materials$ = this.MaterialsFacade.allMaterials$;
  public readonly status$ = this.MaterialsFacade.status$;
  public readonly errors$ = this.MaterialsFacade.errors$;
  public readonly openedFolder$ = this.foldersFacade.openedFolders$;
  public readonly openedMaterials$ = this.foldersFacade.openedFoldersTitle$;

  ngOnInit(): void {
    this.openedFolder$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((folder): folder is IFolder => !!folder),
        map((folder) => folder.id),
        distinctUntilChanged()
      )
      .subscribe((folderId) => {
        this.MaterialsFacade.loadMaterials(folderId);
      });
  }

  onDeleteMaterials(material: IMaterial): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены что хотите удалить файл ${material.title}` },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: boolean) => {
        if (result) {
          this.MaterialsFacade.deleteMaterial(material.id);
          this.snackBar.open('Файл успешно удален!', 'Закрыть', { duration: 4000 });
        }
      });
  }
}
