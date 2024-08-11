import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Material, MaterialsFacade } from '@users/materials/data-access';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { LetDirective } from '@ngrx/component';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaterialsContentComponent } from '@users/materials/feature-materials-content'

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsListComponent, LetDirective],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade)
  private readonly router = inject(Router)
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly folders$ = this.materialsFacade.allFolders$
  public readonly materials$ = this.materialsFacade.filteredMaterials$
  public readonly status$ = this.materialsFacade.materialsStatus$
  public readonly errors$ = this.materialsFacade.materialsErrors$
  public folderTitle!: string 
  
  constructor() {
    this.materialsFacade.loadMaterials();
    this.getFolderName()
  }

  public getFolderName() {
    this.folders$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(folders => {
      for (const item of folders) {
        if (item.id === Number(window.location.href.split('/').pop())) {
          this.folderTitle = item.title
        }
      }
    })
  }
  
  public onBackBtn() {
    this.router.navigate(['/materials']);
  }

  public onOpenMaterialDialog(event: Event) {
    this.dialog.open(MaterialsContentComponent, {data: { material: event } });
  }

  public onDeleteMaterial(material: Material) {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить этот материал?`}
    });
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(result => {
      if (result) this.materialsFacade.deleteMaterial(material.id)
    });
  }
}
