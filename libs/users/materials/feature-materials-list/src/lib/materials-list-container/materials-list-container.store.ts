import { DeepReadonly } from '../../../../../../core/utils/src';
import { FoldersDTO } from '../../../../../../core/data-access/src';
import { MaterialsDTO } from '../../../../../../core/data-access/src/lib/materials-dto.model';
import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { MaterialsFacade } from '@users/materials/data-access';
import { tap } from 'rxjs';


type MaterialsListState = DeepReadonly<{
  materials: MaterialsDTO[];
}>;

const initialState: MaterialsListState = {
  materials: [],
};

@Injectable()
export class MaterialsListContainerStore extends ComponentStore<MaterialsListState> {
  private readonly materialsFacade = inject(MaterialsFacade);
  public readonly materials$ = this.select(({ materials }) => materials);
  public readonly status$ = this.select(this.materialsFacade.status$, (status) => status);
  public errors$ = this.select(this.materialsFacade.error$, (error) => error);

  constructor() {
    super(initialState);
    this.materialsFacade.init();
    this.setMaterialsFromGlobalToLocalStore();
  }

  private setMaterialsFromGlobalToLocalStore(): void {
    this.effect(() => this.materialsFacade.allMaterials$.pipe(tap((materials: MaterialsDTO[]) => this.patchState({materials: materials}))));
  }
}
