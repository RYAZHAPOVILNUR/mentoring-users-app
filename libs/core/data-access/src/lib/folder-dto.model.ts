import { DeepReadonly } from "@users/core/utils";
export enum TypeFolder {
  MentorsFolders = "MENTORS_FOLDERS",
  MyFolders = "MY_FOLDERS",
}
export type FolderDTO = DeepReadonly<{
  id: number;
  title: string;
  created_at: string;
  typeFolder?: TypeFolder,
}>;

export type CreateFolderDTO = DeepReadonly<{
  id?: number | null;
  title: string;
  created_at: string;
  typeFolder?: TypeFolder,
}>;