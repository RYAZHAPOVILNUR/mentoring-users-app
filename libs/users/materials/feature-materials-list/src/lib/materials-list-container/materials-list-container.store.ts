import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { DeepReadonly } from '@users/core/utils';
import { FoldersVM } from '@users/materials/data-access';

type MaterialsListContainerState = DeepReadonly<{
  folder: FoldersVM;
}>;

// const initialState: MaterialsListContainerState = {
//   folders: [];
// };

// @Injectable()
// export class MaterialsListContainerStore extends ComponentStore<MaterialsListContainerState> {
//   constructor() {
//     super(initialState);
//   }
// }
