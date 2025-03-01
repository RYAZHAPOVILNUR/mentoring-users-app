import { MaterialDTO } from "./material-dto.model";

export type MaterialEntity = Omit<MaterialDTO, 'typeMaterial'> & {
  isPDF: boolean | null;
  isAudio: boolean | null;
  isVideo: boolean | null;
};