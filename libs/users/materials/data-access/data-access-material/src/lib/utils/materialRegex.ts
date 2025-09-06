import { MaterialType } from '../interfaces/material-type';

export const materialRegex: Record<MaterialType, RegExp> = {
  video:
    /^(https:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=[\w-]{11}(?:[&?]\S*)*|youtu\.be\/[\w-]{11}|[\w.-]+\/\S+\.mp4))$/,
  pdf: /^(https:\/\/[\w.-]+\/\S+\.pdf)$/,
  audio: /^(https:\/\/[\w.-]+\/\S+\.mp3)$/,
};
