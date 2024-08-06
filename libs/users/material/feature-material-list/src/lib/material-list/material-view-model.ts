import { Errors, LoadingStatus } from '@users/core/data-access';
import { Material } from '@users/material';

export type MaterialListVM = {
  folderName: string | undefined;
  materials: Material[];
  status: LoadingStatus;
  errors: Errors | null;
};
