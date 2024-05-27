import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { LetDirective } from '@ngrx/component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MaterialFacade, OpenMaterialData } from '@users/materials/data-access';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsContentComponent } from '@users/feature-materials-content';
import { MaterialsCreateComponent } from '@users/feature-materials-create';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    MaterialsListComponent,
    LetDirective,
    PdfViewerModule,
    MaterialsCreateComponent,
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
})
export class MaterialsListContainerComponent {
  private readonly facade = inject(MaterialFacade);
  private readonly dialog = inject(MatDialog);
  public readonly materials$ = this.facade.filteredMaterials$;
  public readonly status$ = this.facade.status$;
  public readonly openedFolder$ = this.facade.openedFolders$;

  onDeleteMaterial(id: number): void {
    this.facade.deleteMaterial(id)
  }

  constructor() {
    this.facade.loadMaterials()
  }

  onOpenMaterial(data: OpenMaterialData): void {
    this.dialog.open(MaterialsContentComponent, { data })
  }
}
