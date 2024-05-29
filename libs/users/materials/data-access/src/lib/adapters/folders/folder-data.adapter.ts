import { TFolderDTO, TFolderVM } from "../../models/folders/folder-data.models";

export type TFoldersDataAdapter = {
  DTOtoVM(dto: TFolderDTO): TFolderVM;
  VMtoDTO(vm: TFolderVM): TFolderDTO;
}

export const foldersDataAdapter: TFoldersDataAdapter = {
  DTOtoVM(dto) {
    const { title, created_at } = dto;
    return { title, created_at };
  },

  VMtoDTO(vm) {
    const id = new Date().getTime();
    return { id, ...vm }
  },
}
