import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersFacade, TMaterial, MaterialsFacade } from '@users/materials/data-access';
import { Router } from '@angular/router';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { MaterialsAddButtonComponent } from '@users/feature-materials-create';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsContentComponent } from '@users/feature-materials-content';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LetDirective } from '@ngrx/component';
import { MaterialsListContainerStore } from './materials-list-container.store';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsListComponent, MaterialsAddButtonComponent, LetDirective],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MaterialsListContainerStore],
})
export class MaterialsListContainerComponent {
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  private readonly componentStore = inject(MaterialsListContainerStore);
  public readonly materials$ = this.componentStore.materials$;
  public readonly materialsStatus$ = this.componentStore.materialsStatus$;
  public readonly materialsErrors$ = this.componentStore.materialsErrors$;

  private readonly FoldersFacade = inject(FoldersFacade);
  public readonly openedFolder$ = this.FoldersFacade.openedFolder$;

  private readonly MaterialsFacade = inject(MaterialsFacade);
  public readonly openedMaterials$ = this.MaterialsFacade.openedMaterials$;

  public onBackToFolders() {
    this.router.navigate(['/materials']);
  }

  public onOpenMaterial(material: TMaterial) {
    const dialogRef = this.dialog.open(MaterialsContentComponent, {
      data: material,
    });
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  public onDeleteMaterial(material: TMaterial) {
    this.componentStore.onDeleteMaterial(material);
  }
}
