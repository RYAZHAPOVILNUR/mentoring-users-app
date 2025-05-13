import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { MaterialsAddButtonComponent } from 'libs/users/materials/feature-materials-create/src';
import { Router } from '@angular/router';
import { foldersFacade, materialsFacade } from 'libs/users/materials/data-access/src';
import { LetDirective } from '@ngrx/component';
import { MaterialsListContainerStore } from './materials-list-container.store';
import { MaterialsVM } from 'libs/users/materials/view-models/materials-vm';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsContentComponent } from 'libs/users/materials/feature-materials-content/src/lib/materials-content/materials-content.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private readonly componentStore = inject(MaterialsListContainerStore);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly materialsFacade = inject(materialsFacade);
  private readonly foldersFacade = inject(foldersFacade);
  public readonly materials$ = this.componentStore.materials$;
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;
  public readonly openFolder$ = this.foldersFacade.openFolder$;
  public readonly openMaterial$ = this.materialsFacade.openMaterial$;

  public onBackToFolders() {
    this.router.navigate(['/materials']);
  }

  public onDeleteMaterial(material: MaterialsVM) {
    this.componentStore.deleteMaterial(material);
  }

  public onOpenMaterial(material: MaterialsVM) {
    const dialogRef = this.dialog.open(MaterialsContentComponent, {
      data: material,
    });
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
