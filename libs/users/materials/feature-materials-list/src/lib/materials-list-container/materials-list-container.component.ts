import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersFacade, MaterialDTO, MaterialsFacade } from '@users/materials/data-access';
import { ActivatedRoute, Router } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { map, tap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FoldersListComponent } from '@users/feature-folders-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaterialsAddButtonComponent } from '@users/feature-materials-create';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    LetDirective,
    MatIconModule,
    MatButtonModule,
    FoldersListComponent,
    MatProgressBarModule,
    MaterialsListComponent,
    MaterialsAddButtonComponent,
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
})
export class MaterialsListContainerComponent implements OnInit {
  public materialsFacade = inject(MaterialsFacade);
  public foldersFacade = inject(FoldersFacade);
  public route = inject(ActivatedRoute);
  protected materials$ = this.materialsFacade.allMaterials$;
  public readonly status$ = this.materialsFacade.status$;
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private folderId?: number | any | undefined | unknown;
  private readonly router = inject(Router);
  public folderTitle$ = this.materialsFacade
    .getFolderById(this.folderId)
    ?.pipe(map((folder) => folder?.title ?? 'Unknown Folder'));

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.folderId = +params['id'];
      console.log('Folder ID:', this.folderId);
      this.foldersFacade.init();
      this.materialsFacade.loadMaterials();
      this.materials$ = this.materialsFacade.getMaterialsByFolderId(this.folderId);
      this.folderTitle$ = this.materialsFacade
        .getFolderById(this.folderId)
        ?.pipe(map((folder) => folder?.title ?? 'Unknown Folder'));
    });
  }

  public backOnFolders() {
    this.router.navigate(['/materials']);
  }

  deleteMaterial(material: MaterialDTO) {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${material.title}` },
    });
    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((result: boolean) => {
          if (result) this.materialsFacade.deleteMaterial(material.id);
        })
      )
      .subscribe();
  }
}
