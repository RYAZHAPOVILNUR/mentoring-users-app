import { DeepReadonly } from "@users/core/utils";
import { FoldersEntity } from "./folders.entity";

export type FoldersVM = DeepReadonly<Pick<FoldersEntity, 'createdAt' | 'title' | 'id'>>;