import { DeepReadonly } from '@users/core/utils';
import { Material } from '../../../../data-access/src/lib/models/material.models';
import { LoadingStatus } from '@users/core/data-access';
import { Folder } from '../../../../data-access/src/lib/models/folder.models';

export type MaterialsListVm = DeepReadonly<{
  openedFolder?: Folder
  materials: Material[]
  status: LoadingStatus
}>
