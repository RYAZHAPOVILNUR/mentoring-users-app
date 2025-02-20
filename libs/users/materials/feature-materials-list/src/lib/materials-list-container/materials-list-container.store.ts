import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { DeepReadonly } from '@users/core/utils';
import { MaterialsFacade, MaterialsVM } from '@users/materials/data-access';

type MaterialsListContainerState = DeepReadonly<{
  materials: MaterialsVM;
}>;

const initialState: MaterialsListContainerState = {
  materials: [],
};

@Injectable()
export class MaterialsListContainerStore extends ComponentStore<MaterialsListContainerState> {
  private readonly materialsFacade = inject(MaterialsFacade);
  public readonly materials$ = this.select(({ materials }) => materials);
  public readonly status$ = this.select(this.materialsFacade.status$, (status) => status);
  public errors$ = this.select(this.materialsFacade.errors$, (error) => error);

  constructor() {
    super(initialState);
    this.materialsFacade.init();
  }
}
