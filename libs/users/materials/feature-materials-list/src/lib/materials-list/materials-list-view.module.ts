import { NgModule } from '@angular/core';
import { DeepReadonly } from '@users/core/utils';
import { LoadingStatus } from '@users/core/data-access';
import { MaterialsVM } from '@users/materials/data-access';

export type MaterialsListVM = DeepReadonly<{
  materials: MaterialsVM;
  status: LoadingStatus;
  // errors: MaterialsErrors | null;
}>;
