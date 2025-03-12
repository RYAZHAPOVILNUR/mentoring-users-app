import { DeepReadonly } from "@users/core/utils";
import { IFolder } from "../models/folder.model";

export type FoldersVM = DeepReadonly<Pick<IFolder, 'id' | 'created_at'| 'title'>>
