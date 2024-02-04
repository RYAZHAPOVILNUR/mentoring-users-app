import { Store } from '@ngrx/store';
import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { DeepReadonly } from '@users/core/utils';
import { ActivatedRoute } from '@angular/router';
import { LoadingStatus, selectRouteParams } from '@users/core/data-access';
import { ApiService } from '@users/core/http';
import { CreateMaterial, Material } from '../../../../data-access/src/lib/models/material.models';
import { map, Observable, switchMap, tap, withLatestFrom } from 'rxjs';
import * as materialsSelector from '../../../../data-access/src/lib/+state/materials.selectors';

type MaterialsState = DeepReadonly<
  {
    materials: Material[],
    status: LoadingStatus
  }>

const initialState: MaterialsState = {
  materials: [],
  status: 'loading'
};

@Injectable()
export class MaterialsListContainerStore extends ComponentStore<MaterialsState> {
  private readonly store = inject(Store)
  private readonly route = inject(ActivatedRoute)
  private readonly apiService = inject(ApiService);
  public readonly materials$ = this.select(state => state.materials);
  public readonly status$ = this.select(state => state.status)
  public readonly openedFolder$ = this.store.select(materialsSelector.selectOpenedFolder)
  // public readonly selectRouteParams$ = this.store.select(selectRouteParams);

  constructor() {
    super(initialState);
  }

  public loadMaterials() {
    this.effect(
      () => this.apiService.get<Material[]>('/material').pipe(
        map((materials) =>
          materials.filter((material) => material.folder_id === +this.route.snapshot.params['id'])
        ),
        tap((materials) => this.setState({ materials: materials, status: 'loaded' }))
      )
    );
  }

  // readonly addMaterials = this.effect((material$: Observable<CreateMaterial>) =>
  //   material$.pipe(
  //     withLatestFrom(this.selectRouteParams$),
  //     switchMap(([material, params]) => {
  //       const folderId = params['id']; // Получаем folder_id из параметров маршрута
  //       const materialWithFolderId = { ...material, folder_id: folderId }; // Добавляем folder_id к создаваемому материалу
  //       return this.apiService.post<Material, CreateMaterial>('/material', materialWithFolderId).pipe(
  //         tap((createdMaterial) => {
  //           this.patchState((state) => ({
  //             ...state,
  //             materials: [...state.materials, createdMaterial],
  //           }));
  //         })
  //       );
  //     })
  //   )
  // );

  readonly addMaterial = this.effect((material$: Observable<CreateMaterial>) =>
    material$.pipe(
      withLatestFrom(this.route.params), // Получаем текущие параметры маршрута
      switchMap(([material, params]) => {
        this.patchState({status: 'loading'})
        const folderId = params['id']; // Получаем folder_id из параметров маршрута
        const materialWithFolderId = { ...material, folder_id: folderId }; // Добавляем folder_id к создаваемому материалу
        return this.apiService.post<Material, CreateMaterial>('/material', materialWithFolderId).pipe(
          tap((createdMaterial) => {
            this.setState((state) => ({
              ...state,
              materials: [...state.materials, createdMaterial],
              status: 'loaded'
            }));
          })
        );
      })
    )
  );

  deleteMaterial(id: number) {
    this.patchState({status: 'loading'})
    this.apiService.delete<Material>(`/material/${id}`).subscribe(() => {
      this.updateMaterialStateAfterDelete(id);
    });
  }

  private updateMaterialStateAfterDelete(id: number) {
    this.setState((state) => ({
      status: 'loaded',
      materials: state.materials.filter((material: Material) => material.id !== id)
    }));
  }


  // public loadMaterials() {
  //   this.effect(
  //     () => this.selectRouteParams$.pipe(
  //       switchMap(params => {
  //         const folderId = params['id'];
  //         return this.apiService.get<Material[]>(`/material`).pipe(
  //           map(materials => materials.filter(material => material.folder_id === +folderId))
  //         );
  //       }),
  //       tap(filteredMaterials => {
  //         this.setState({ materials: filteredMaterials, status: 'loaded' });
  //       })
  //     )
  //   );
  // }
  //
  //
}

