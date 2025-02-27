import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { DeepReadonly } from '@users/core/utils';
import { MaterialsEntity, MaterialsFacade, MaterialsVM, materialsVMAdapter } from '@users/materials/data-access';
import { combineLatest, tap } from 'rxjs';

type MaterialsListState = DeepReadonly<{
  materials: MaterialsVM[];
}>;

const initialState: MaterialsListState = {
  materials: [],
};

@Injectable({ providedIn: 'root' })
export class MaterialsListContainerStore extends ComponentStore<MaterialsListState> {
  private readonly materialsFacade = inject(MaterialsFacade);
  public readonly materials$ = this.select(({ materials }) => materials);
  public readonly status$ = this.select(this.materialsFacade.status$, (status) => status);
  public errors$ = this.select(this.materialsFacade.errors$, (error) => error);

  constructor() {
    super(initialState);
  }

  init() {
    this.materialsFacade.init();
    this.setMaterialsFromGlobalToLocaleStore();
    console.log('Store Init...');
  }

  // private setMaterialsFromGlobalToLocaleStore(): void {
  //   this.effect(() =>
  //     this.materialsFacade.filtredMaterials$.pipe(tap((materials: MaterialsEntity[]) => this.patchMaterials(materials)))
  //   )();
  // }

  // private setMaterialsFromGlobalToLocaleStore(): void {
  //   this.effect(() =>
  //     combineLatest([
  //       this.materialsFacade.filtredMaterials$,
  //       this.status$, // или другие зависимости
  //     ]).pipe(tap(([materials]) => this.patchMaterials(materials)))
  //   )();
  // }

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
