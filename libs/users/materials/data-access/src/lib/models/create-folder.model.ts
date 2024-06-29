import { DeepReadonly } from "@users/core/utils";
import { Folder } from "./folder.model";

export type CreateFolder = DeepReadonly<Pick<Folder, "title">>;
