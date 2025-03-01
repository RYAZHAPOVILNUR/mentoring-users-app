import { DeepReadonly } from "@users/core/utils";
export enum TypeFolder {
  MentorsFolders = "mentors folders",
  MyFolders = "my folders",
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