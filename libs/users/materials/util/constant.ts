export const FOLDER_URL = '/folder';
export const MATERIAL_URL = '/material';

export const MATERIAL_ICONS = {
  '.mp3': 'audiotrack',
  '.pdf': 'picture_as_pdf',
  'video': 'video_library'
};

export const MONTHS =
  ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const MATERIAL_TYPE = {
  audio: 'audio',
  video: 'video',
  pdf: 'pdf'
};

export const MODAL_CONFIRM_TEXT = {
  FOLDER_DELETE: {
    DESCRIPTION: 'Are you sure you want to delete the folder?',
    BUTTON_TEXT: 'Delete folder'
  }
};

export enum DELETE_ITEM_TYPE {
  EMPTY,
  FOLDER,
  MATERIAL
}

export const ADD_MATERIAL_FORM_LIMITS = {
  MATERIAL_TITLE: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 15
  },
  MATERIAL_LINK: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 100
  }
};

export const ADD_FOLDER_LIMITS = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 15
};


export const YOUTUBE_REGEX = /(http(s)?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}/;
export const MP3_REGEX = /\.mp3$/i;
export const PDF_REGEX = /\.pdf$/i;
