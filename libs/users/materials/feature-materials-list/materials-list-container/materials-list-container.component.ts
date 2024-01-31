import { Component, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsFacade } from '../../data-access/src/lib/+state/materials.facade';
import { Store } from '@ngrx/store';
import { selectMaterialsEntities, selectMaterialsStatus} from '../../data-access/src/lib/+state/materials.selectors';
import { LetDirective, PushPipe } from '@ngrx/component';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { MaterialsAddButtonComponent } from '@users/feature-materials-create';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { MaterialsEntity } from '../../data-access/src/lib/models/materials.entity';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    PushPipe,
    LetDirective,
    MaterialsListComponent,
    MaterialsAddButtonComponent,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
})
export class MaterialsListContainerComponent {
  activateRoute: ActivatedRoute = inject(ActivatedRoute);
  store = inject(Store);
  materialsFacade = inject(MaterialsFacade);
  public materials$ = this.store.select(selectMaterialsEntities);
  public status$ = this.store.select(selectMaterialsStatus);
  @Output() idFolder!: number; 

  constructor(){
    this.idFolder = this.activateRoute.snapshot.params["id"]; //router
    this.materialsFacade.initMaterials();
  }

  onDeleteMaterial(material: MaterialsEntity){
    this.materialsFacade.deleteMaterial(material);
  }
}
