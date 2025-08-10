export interface CreateFolder {
  title: string;
}

export interface Folder extends CreateFolder {
  id: number;
  created_at: Date;
}
