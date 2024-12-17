import { MaterialsAddButtonComponent } from '@users/materials/feature-materials-create';

import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersFacade, IMaterial, MaterialsFacade } from '@users/materials/data-access';
import { map, tap } from 'rxjs';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { LetDirective } from '@ngrx/component';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    MaterialsListComponent,
    LetDirective,
    MaterialsAddButtonComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly foldersFacade = inject(FoldersFacade);
  private readonly openedFolder$ = this.foldersFacade.openedFolder$;
  public readonly openedFolderTitle$ = this.openedFolder$.pipe(map((folder) => folder?.title));
  public readonly allMaterials$ = this.materialsFacade.allMaterials$;
  public readonly materialsStatus$ = this.materialsFacade.materialsStatus$;
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  constructor() {
    this.materialsFacade.loadMaterials();
  }

  public onBackOnFolders() {
    this.router.navigate([`/materials`]);
  }

  public deleteMaterial(material: IMaterial): void {
    const dialogRef = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены что хотите удалить материал ${material.title}` },
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((result: boolean) => {
          if (result) {
            this.materialsFacade.deleteMaterial(material.id);
          }
        })
      )
      .subscribe();
  }
}
