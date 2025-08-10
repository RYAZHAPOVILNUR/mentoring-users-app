import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LetDirective } from '@ngrx/component';
import { FoldersFacade } from '@users/data-access-folders';
import { CoreUiConfirmDialogComponent } from '@core/ui-core';
import { CreateMaterial, Material, MaterialsFacade } from '@users/data-access-materials';
import { MaterialsAddButtonComponent, MaterialsAddDialogComponent } from '@users/feature-materials-create';
import { MaterialsContentComponent } from '@users/feature-materials-content';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { RouterLink } from '@angular/router';
import { filter, take } from 'rxjs';

@Component({
  selector: 'users-materials-list-container',
  imports: [
    CommonModule,
    MatIconModule,
    RouterLink,
    MaterialsAddButtonComponent,
    MaterialsListComponent,
    LetDirective,
    MatProgressBarModule,
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrl: './materials-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent implements OnInit {
  public readonly dialog = inject(MatDialog);
  public readonly foldersFacade = inject(FoldersFacade);
  public readonly materialsFacade = inject(MaterialsFacade);
  public readonly openedFolder$ = this.foldersFacade.openedFolder$;
  public readonly status$ = this.materialsFacade.status$;
  public readonly materials$ = this.materialsFacade.materials$;

  ngOnInit(): void {
    this.materialsFacade.loadMaterials();
  }

  public publishMaterial(materialType: string): void {
    const dialogRef = this.dialog.open(MaterialsAddDialogComponent, {
      data: { type: materialType },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((material: CreateMaterial) => {
        if (material) {
          this.materialsFacade.publishMaterial(material);
        }
      });
  }

  public deleteMaterial(material: Material) {
    const dialogRef = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить материал "${material.title}"?` },
    });

    dialogRef
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => {
        this.materialsFacade.deleteMaterial(material.id);
      });
  }

  public viewMaterial(material: Material) {
    this.dialog.open(MaterialsContentComponent, {
      data: material,
    });
  }
}
