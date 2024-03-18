import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsFacade } from '@users/materials/data-access';
import { MaterialsAddButtonComponent } from '@users/materials/materials-create';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { LetDirective } from '@ngrx/component';
import { RevealMaterialData } from '@users/materials/data-access';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsContentComponent } from '@users/materials/materials-content';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsAddButtonComponent, MaterialsListComponent, LetDirective, PdfViewerModule],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly dialog = inject(MatDialog);
  public readonly materials$ = this.materialsFacade.filteredMaterials$;
  public readonly status$ = this.materialsFacade.status$;
  public readonly revealedFolder$ = this.materialsFacade.revealedFolder$;

  onDeleteMaterial(id: number): void {
    this.materialsFacade.deleteMaterial(id);
  }

  onRevealMaterial(data: RevealMaterialData): void {
    this.dialog.open(MaterialsContentComponent, { data });
  }
}
