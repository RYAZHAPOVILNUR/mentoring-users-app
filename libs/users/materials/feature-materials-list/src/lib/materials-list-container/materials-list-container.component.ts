import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { MaterialsAddButtonComponent } from '@users/feature-materials-create';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Material, MaterialFacade } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsContentComponent } from '@users/feature-materials-content';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    MaterialsListComponent,
    MaterialsAddButtonComponent,
    MatButtonModule,
    MatIconModule,
    LetDirective,
    MaterialsContentComponent,
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsListContainerComponent {
  private readonly MaterialFacade = inject(MaterialFacade);
  private readonly activatedRouter = inject(ActivatedRoute);

  public readonly materials$ = this.MaterialFacade.materials$;
  public readonly status$ = this.MaterialFacade.statusMaterials$;
  public readonly error$ = this.MaterialFacade.errorMaterials$;
  private readonly modalDialog = inject(MatDialog);
  
  constructor(){
    this.MaterialFacade.loadMaterials(+this.activatedRouter.snapshot.queryParams['id']);
  }

  onShowContenr(material: Material){
    const modalDialogRef = this.modalDialog.open(MaterialsContentComponent, {data: material});
    modalDialogRef.afterClosed();
  }

  onDeleteMaterial(material_id: number){
    this.MaterialFacade.deleteMaterials(material_id);
  }
}
