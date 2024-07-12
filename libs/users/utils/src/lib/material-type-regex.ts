export const regexFileType = {
  video: /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/,
  audio: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.mp3$/,
  pdf: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.pdf$/,
};
