import { MONTHS } from './constant';

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
