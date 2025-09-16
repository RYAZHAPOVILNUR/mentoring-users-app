import { MaterialType } from '@users/data-access-material';

export const MATERIAL_REGEX: Record<MaterialType, RegExp> = {
  video:
    /^(https:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=[\w-]{11}(?:[&?]\S*)*|youtu\.be\/[\w-]{11}|[\w.-]+\/\S+\.mp4))$/,
  pdf: /^(https:\/\/[\w.-]+\/\S+\.pdf)$/,
  audio: /^(https:\/\/[\w.-]+\/\S+\.mp3)$/,
};
