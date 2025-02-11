import { ChangeDetectionStrategy, Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { DeepReadonlyArray } from '@users/core/utils';
import { MaterialsFacade } from '@users/data-access';
import { map, tap } from 'rxjs';
import { MaterialsEntity } from '../../../../data-access/src/lib/models/materials.entity';
import { MaterialsListComponent } from '../materials-list/materials-list.component';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsListComponent, LetDirective],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  // @Input({ required: true  })
  // folderId!: number;

  public materialsFacade =  inject(MaterialsFacade);
  public readonly  materials$ = this.materialsFacade
    .materialsForOpenedFolder$.pipe(
      map(materials => materials as
      DeepReadonlyArray<MaterialsEntity>),
      tap(materials => console.log('materials:', materials))
    );
  public readonly status$ = this.materialsFacade.status$;
  public readonly errors$ = this.materialsFacade.errors$;

  constructor() {
    this.materialsFacade.initMaterials();
  }
}
