import { LoadingStatus } from "@users/core/data-access";
import { DeepReadonly } from "@users/core/utils";
import { Folder } from "@users/users/materials/data-access";

export type FoldersListVM = DeepReadonly<{
  folders: Folder[];
  status: LoadingStatus;
  error: Error | null;
}>