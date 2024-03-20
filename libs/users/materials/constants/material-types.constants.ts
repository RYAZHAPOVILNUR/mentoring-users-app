export const MATERIAL_TYPES = {
  VIDEO: {
    label: 'Видео',
    validationRegex: /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/,
    icon: 'smart_display',
  },
  PDF: { label: 'Файл PDF', validationRegex: /\.pdf$/, icon: 'picture_as_pdf' },
  PODCAST: { label: 'Подкаст', validationRegex: /\.mp3$/, icon: 'music_note' },
};
