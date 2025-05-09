import { LoadingStatus } from "@users/core/data-access";
import { DeepReadonly } from "@users/core/utils";
import { FoldersErrors, FoldersType } from "@users/materials/data-access";

export type FoldersListVM = DeepReadonly<{
  folders: FoldersType[];
  status: LoadingStatus;
  errors: FoldersErrors | null;
}>;