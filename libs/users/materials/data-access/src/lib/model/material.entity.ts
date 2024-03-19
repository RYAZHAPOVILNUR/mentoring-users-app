
export type FolderEntity = {
  id: number
  createdDate:number
  title:string
}

export type MaterialEntity = {
  id: number,
  createdDate: number,
  title: string,
  link: string,
  folderId: number
}

export type AddMaterialEntity = Omit<MaterialEntity, 'id' | 'createdDate' | 'folderId'>;