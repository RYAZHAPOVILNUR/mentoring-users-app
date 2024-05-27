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

// export const dataType = (data: string): string => {
//     if(data.endsWith('.pdf') ) {
//       return 'PDF';
//     } else if(data.endsWith('.mp3')) {
//       return 'MP3';
//     } else {
//       return 'VIDEO';
//   }
// }
