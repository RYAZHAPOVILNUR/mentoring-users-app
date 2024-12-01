import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersFacade, MaterialDTO, MaterialsFacade } from '@users/materials/data-access';
import { ActivatedRoute, Router } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { combineLatest, map, switchMap, tap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaterialsAddButtonComponent } from '@users/feature-materials-create';
import { MaterialsContentComponent } from '@users/feature-materials-content';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    LetDirective,
    MatIconModule,
    MatButtonModule,
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
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly folderId$ = this.route.params.pipe(
    map((params) => +params['id'])
  );

  public materials$ = this.folderId$.pipe(
    tap((folderId) => console.log('Folder ID:', folderId)),
    switchMap((folderId) => this.materialsFacade.getMaterialsByFolderId(folderId))
  );

  public folderTitle$ = this.folderId$.pipe(
    switchMap((folderId) => this.materialsFacade.getFolderById(folderId)),
    map((folder) => folder?.title ?? 'Unknown Folder')
  );

  public readonly status$ = this.materialsFacade.status$;

  ngOnInit() {
    this.foldersFacade.init();
    this.materialsFacade.loadMaterials();
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

  openMaterial(material: MaterialDTO) {
    const dialogRef: MatDialogRef<MaterialsContentComponent> = this.dialog.open(MaterialsContentComponent, {
      data: { material },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
