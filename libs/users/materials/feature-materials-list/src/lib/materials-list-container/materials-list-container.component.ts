import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMaterialsButtonComponent } from '@users/materials/feature-materials-create';
import { Material, MaterialsFacade } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, CreateMaterialsButtonComponent, LetDirective, MaterialsListComponent],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly router = inject(Router);
  public readonly allMaterials$ = this.materialsFacade.allMaterials$;
  public readonly materials$ = this.materialsFacade.filteredMaterials$;
  public readonly status$ = this.materialsFacade.materialsStatus$;
  public readonly errors$ = this.materialsFacade.materialsErrors$;
  public readonly openedFolder$ = this.materialsFacade.openedFolder$;

  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.materialsFacade.loadMaterials();
  }

  public onBackBtn() {
    this.router.navigate(['/materials']);
  }

  // public onOpenMaterialDialog(event: Event) {
  //   this.dialog.open(MaterialsContentComponent, {data: { material: event } });
  // }

  public onDeleteMaterial(material: Material): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> =
      this.dialog.open(CoreUiConfirmDialogComponent, {
        data: { dialogText: `Вы уверены, что хотите удалить ${material.title}` },
      });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: boolean) => {
        if (result) this.materialsFacade.deleteMaterial(material.id);
      })
  }
}
