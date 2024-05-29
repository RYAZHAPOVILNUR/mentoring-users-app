import { TMaterialDTO, TMaterialVM } from "../../models/materials/material-data.models";

export type TMaterialsDataAdapter = {
  DTOtoVM(dto: TMaterialDTO): TMaterialVM;
  VMtoDTO(vm: TMaterialVM): TMaterialDTO;
}

export const materialsDataAdapter: TMaterialsDataAdapter = {
  DTOtoVM(dto) {
    const { title, created_at, material_link } = dto;
    return { title, created_at, material_link };
  },

  VMtoDTO(vm) {
    const id = new Date().getTime();
    const folder_id = new Date().getTime();
    return { id, folder_id, ...vm }
  },
}
