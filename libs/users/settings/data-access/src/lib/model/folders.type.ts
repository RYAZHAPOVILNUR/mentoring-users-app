export type FolderType = {
  "id": number,
  "created_at": number,
  "title": string
}

export type FolderModel = {
  list: FolderType[];
  errormessage: string;
}