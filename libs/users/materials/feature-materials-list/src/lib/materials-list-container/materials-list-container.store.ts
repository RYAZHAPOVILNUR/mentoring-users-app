import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { State } from '@ngrx/store';
import { DeepReadonly } from '@users/core/utils';
import { MaterialsEntity, MaterialsFacade, MaterialsVM, materialsVMAdapter } from '@users/materials/data-access';
import { combineLatest, map, tap } from 'rxjs';

type MaterialsListState = DeepReadonly<{
  materials: MaterialsVM[];
}>;

const initialState: MaterialsListState = {
  materials: [],
};

interface MaterialsState {
  materials: MaterialsEntity[];
  selectedMaterialId: number | null;
}

@Injectable({ providedIn: 'root' })
export class MaterialsListContainerStore extends ComponentStore<MaterialsListState> {
  private readonly materialsFacade = inject(MaterialsFacade);

  public readonly materials$ = this.select(({ materials }) => materials);
  public readonly status$ = this.select(this.materialsFacade.status$, (status) => status);
  public errors$ = this.select(this.materialsFacade.errors$, (error) => error);

  constructor() {
    super(initialState);
    this.materialsFacade.init();
    this.setMaterialsFromGlobalToLocaleStore();
  }

  readonly filteredMaterials$ = this.select(this.state$, (state) =>
    state.materials.filter((material) => material.folderId === 2178)
  );

  private setMaterialsFromGlobalToLocaleStore(): void {
    this.effect(() =>
      this.materialsFacade.filtredMaterials$.pipe(tap((materials: MaterialsEntity[]) => this.patchMaterials(materials)))
    );
  }

  private patchMaterials(materials: MaterialsEntity[]): void {
    this.patchState({
      materials: materials.map((material) => materialsVMAdapter.entityToVM(material)),
    });
  }
}
