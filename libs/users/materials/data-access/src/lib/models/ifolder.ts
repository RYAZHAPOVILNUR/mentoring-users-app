// переделать на FolderInterface
export interface IFolder {
  id: number;
  created_at: number;
  title: string;
}

// переделать на type: FolderType
export interface IFolderCreate {
  title: string;
}

export interface IFolderId {
  id: number;
}
