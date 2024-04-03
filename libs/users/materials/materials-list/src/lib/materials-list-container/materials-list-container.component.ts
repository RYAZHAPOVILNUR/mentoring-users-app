import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsFacade } from '@users/materials/data-access';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { LetDirective } from '@ngrx/component';
import { MaterialDTO, CreateMaterial } from '@users/materials/data-access';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsContentComponent } from '@users/materials/materials-content';
import { AddButtonComponent } from '@users/materials/shared';
import { MaterialsAddDialogComponent } from '@users/materials/materials-create';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsListComponent, LetDirective, PdfViewerModule, AddButtonComponent],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsListContainerComponent {
  public readonly materialsFacade = inject(MaterialsFacade);
  private readonly dialog = inject(MatDialog);
  public readonly MaterialsAddDialogComponent = MaterialsAddDialogComponent;

  constructor() {
    this.materialsFacade.openFolder();
  }

  onDeleteMaterial(id: number): void {
    this.materialsFacade.deleteMaterial(id);
  }

  onRevealMaterial(data: Pick<MaterialDTO, 'title' | 'material_link'>): void {
    this.dialog.open(MaterialsContentComponent, { data });
  }

  onAddMaterial(newMaterial: Omit<CreateMaterial, 'folder_id'>): void {
    this.materialsFacade.addMaterial(newMaterial);
  }
}
