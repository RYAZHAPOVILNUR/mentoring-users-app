export const dataTypeChecker = (data: string): string => {
  switch (data) {
    case '.pdf':
      return '^.*\\.pdf$';
    case '.mp3':
      return '^.*\\.mp3$';
    default:
      return '^.*(?:youtube\\.|youtu\\.be).*$';
  }
};
