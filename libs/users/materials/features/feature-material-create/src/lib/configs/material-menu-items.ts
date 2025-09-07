export interface MaterialMenuItem {
  type: string;
  label: string;
}

export const materialMenuItems: MaterialMenuItem[] = [
  { type: 'video', label: 'Видео' },
  { type: 'pdf', label: 'Файл PDF' },
  { type: 'audio', label: 'Подкаст' },
];
