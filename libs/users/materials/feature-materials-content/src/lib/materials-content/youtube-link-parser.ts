import { inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export const youtubeLinkParser = (url: string): SafeResourceUrl | null => {
  const sanitazer = inject(DomSanitizer);
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const id = match && match[2].length === 11 ? match[2] : null;
  return sanitazer.bypassSecurityTrustResourceUrl(
    'https://www.youtube.com/embed/' + id
  );
};
