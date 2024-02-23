import { MATERIAL_ICONS, MONTHS } from './constant';
import { IMaterialModal } from '../data-access/src/lib/models/models';

export const getFormattedDate = (time: string): string => {
  const date: Date = new Date(time);

  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

export const getIdFromUrl = (url: string): number => {
  if (url && typeof url === 'string') {
    const parts = url.split('/');
    const lastPart = parts.pop();
    if (lastPart !== undefined) {
      return +lastPart;
    }
  }
  return 0;
};


export const getPreviewLink = ({ materialType, materialLink }: IMaterialModal): string => {
  if (materialType !== MATERIAL_ICONS['video'] && !materialLink) return '';

  const videoId = materialLink.split('=').pop();
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};
