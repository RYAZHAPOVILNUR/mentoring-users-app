import { NgModule } from '@angular/core';
import { DeepReadonly } from '@users/core/utils';
import { FoldersErrors, FoldersVM } from '@users/materials/data-access';
import { LoadingStatus } from '@users/core/data-access';

export type FoldersListVM = DeepReadonly<{
  folders: FoldersVM[];
  status: LoadingStatus;
  errors: FoldersErrors | null;
}>;
