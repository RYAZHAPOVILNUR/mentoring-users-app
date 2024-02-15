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
    DESCRIPTION: 'Are you sure you need to delete the folder?',
    BUTTON_TEXT: 'Delete folder'
  }
};

export enum DELETE_ITEM_TYPE {
  FOLDER,
  MATERIAL,
  EMPTY
}
