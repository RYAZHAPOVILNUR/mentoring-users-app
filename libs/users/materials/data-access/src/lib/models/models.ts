import { DELETE_ITEM_TYPE } from '../../../../util/constant';

export interface IFolder {
  id: string,
  created_at: string,
  title: string
}

export interface IMaterial {
  id: string,
  created_at: string,
  title: string,
  material_link: string,
  folder_id: number
}

export interface IMaterialPost {
  title: string,
  material_link: string,
  folder_id: number
}

export interface IDeleteItem {
  deleteId: number,
  title: string,
  type: DELETE_ITEM_TYPE
}

export interface IMaterialModal {
  materialLink: string;
  materialType: string;
  materialTitle: string;
}


