export interface IFolder {
  id: number;
  created_at: number;
  title: IFolderTitle;
}

export interface IFolderTitle {
  title: string;
}

export interface IFolderId {
  id: number;
}
