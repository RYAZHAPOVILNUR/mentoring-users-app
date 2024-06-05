import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { Store } from '@ngrx/store';
import { MaterialsStateInterface, selectAllMaterials, MaterialsActions } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MaterialsCardComponent],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  // private store$ = inject(Store<MaterialsStateInterface>);
  // public readonly materials$ = this.store$.select(selectAllMaterials);
  
  // ngOnInit(): void {
  //   this.store$.dispatch(MaterialsActions.getMaterials())
  // }
}
