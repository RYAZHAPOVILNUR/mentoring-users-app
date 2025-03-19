import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { foldersFacade, IMaterial, materialsFacade } from '@users/materials/data-access';
import { Router } from '@angular/router';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { MaterialsAddButtonComponent } from '@users/feature-materials-create';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialsContentComponent } from '@users/feature-materials-content';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsListComponent, MaterialsAddButtonComponent, LetDirective],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent implements OnInit {
  ngOnInit(): void {
    this.foldersFacade.loadFolders();
    this.materialsFacade.loadMaterials();
  }

  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  public readonly foldersFacade = inject(foldersFacade);
  public readonly openedFolder$ = this.foldersFacade.openedFolder$;

  public readonly materialsFacade = inject(materialsFacade);
  public readonly materials$ = this.materialsFacade.allMaterials$;
  public readonly materialsStatus$ = this.materialsFacade.materialsStatus$;
  public readonly materialsErrors$ = this.materialsFacade.materialsErrors$;
  public readonly openedMaterials$ = this.materialsFacade.openedMaterials$;
  public readonly selectedMaterials$ = this.materialsFacade.selectedMaterials$;

  onDeleteMaterial(material: IMaterial) {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы хотите удалить "${material.title}"?` },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.materialsFacade.deleteMaterials(material.id);
      }
    });
  }

  public onBackToFolders() {
    this.router.navigate(['/materials']);
  }

  public onOpenMaterial(material: IMaterial) {
    const dialogRef = this.dialog.open(MaterialsContentComponent, {
      data: material,
    });
    console.log(material);
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
