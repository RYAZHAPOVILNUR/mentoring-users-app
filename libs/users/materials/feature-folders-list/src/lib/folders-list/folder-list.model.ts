import { LoadingStatus } from "@users/core/data-access";
import { DeepReadonly } from "@users/core/utils";
import { FolderDTO, FoldersErrors } from "@users/materials/data-access";

export type FoldersList = DeepReadonly<{
  folders: FolderDTO[];
  status: LoadingStatus;
  errors: FoldersErrors | null;
}>;
