import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, filter, map, tap } from 'rxjs';

import { FoldersFacade } from '@users/materials/data-access-folders';
import { Material, MaterialsFacade } from '@users/materials/data-access-materials';
import { MaterialsContentComponent } from '@users/materials/feature-materials-content';
import { MaterialsAddButtonComponent } from '@users/materials/feature-materials-create';

import { MaterialsListComponent } from '../materials-list/materials-list.component';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsListComponent, MaterialsAddButtonComponent],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly foldersFacade = inject(FoldersFacade);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  public readonly folderId$ = this.route.params.pipe(
    map((params) => Number(params['id']) || null),
    filter((id) => id !== null),
  );

  public readonly vm$ = combineLatest([
    this.materialsFacade.allMaterials$,
    this.materialsFacade.materialsStatus$,
    this.materialsFacade.materialsError$,
    this.foldersFacade.openedFolder$,
  ]).pipe(
    map(([materials, status, error, openedFolder]) => ({
      materials: materials || [],
      status: status || 'init',
      error: error?.message || null,
      folderTitle: openedFolder?.title || 'Материалы',
    })),
  );

  ngOnInit(): void {
    this.setupRouteListener();
    this.setupErrorListener();
  }

  onDeleteMaterial(id: number): void {
    this.materialsFacade.deleteMaterial(id);
  }
  onOpenMaterial(material: Material): void {
    this.dialog.open(MaterialsContentComponent, {
      data: { material },
      width: '90%',
      maxWidth: '1200px',
      height: '90%',
      panelClass: 'material-dialog',
    });
  }
  onBackToFolders(): void {
    this.router.navigate(['/materials']);
  }
  private setupRouteListener(): void {
    this.folderId$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((folderId) => {
          this.materialsFacade.loadMaterials();
          this.foldersFacade.openFolder(folderId);
        }),
      )
      .subscribe();
  }

  private setupErrorListener(): void {
    this.materialsFacade.materialsError$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean),
        tap((error) => {
          this.snackBar.open(`Ошибка: ${error.message || 'Неизвестная ошибка'}`, 'Закрыть', { duration: 5000 });
        }),
      )
      .subscribe();
  }
}
