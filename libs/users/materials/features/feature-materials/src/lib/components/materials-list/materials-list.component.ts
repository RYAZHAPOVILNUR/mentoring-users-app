import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { filter, tap } from 'rxjs';

import { MaterialsFacade } from '@users/materials/data-access-materials';
import { OpenCreateMaterialDialogService } from '@users/materials/util-materials';
import { ConfirmDeleteDialogService } from '@users/shared';
import { DialogData, Material } from '@users/ui-materials';

import { MaterialCardComponent } from './materials-card/material-card.component';
import { MaterialCreateButtonComponent } from './materials-list-create-button/material-create-button.component';
import { MaterialsNavigationPanelComponent } from './materials-navigation/materials-navigation-panel.component';

@Component({
  selector: 'users-materials-list',
  imports: [
    CommonModule,
    MaterialCardComponent,
    MatProgressBar,
    MaterialCreateButtonComponent,
    MaterialsNavigationPanelComponent,
  ],
  templateUrl: './materials-list.component.html',
  styleUrl: './materials-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly confirmDeleteDialogService = inject(ConfirmDeleteDialogService);
  private readonly openCreateMaterialDialogService = inject(OpenCreateMaterialDialogService);

  readonly isLoadingStatus$ = this.materialsFacade.isLoadingStatus$;
  readonly material$ = this.materialsFacade.filteredMaterials$;

  constructor() {
    this.materialsFacade.loadMaterials();
  }
  deleteMaterial(material: Material) {
    const dialogRef = this.confirmDeleteDialogService.openDeleteFolderDialog(material.title);

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap(() => this.materialsFacade.deleteMaterial(material.id)),
      )
      .subscribe();
  }
  createMaterial(materialType: DialogData) {
    const dialogRef = this.openCreateMaterialDialogService.open(materialType);

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((createMaterial) => this.materialsFacade.createMaterial(createMaterial)),
      )
      .subscribe();
  }
}
