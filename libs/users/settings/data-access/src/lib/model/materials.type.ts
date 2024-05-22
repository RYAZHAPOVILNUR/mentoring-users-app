export type MaterialType = {
  "id"?: number,
  "created_at"?: number,
  "title": string,
  "material_link": string,
  "folder_id": number
}

export type MaterialModel = {
  list: MaterialType[];
  errormessage: string;
  material: MaterialType
}