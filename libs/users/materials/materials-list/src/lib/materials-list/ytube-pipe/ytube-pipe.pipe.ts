import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'ytubePipe',
  standalone: true,
})
export class YtubePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  createYoutubeEmbed(key: string): string {
    return `https://www.youtube.com/embed/${key}`;
  }

  transform(url: string): SafeResourceUrl {
    if (!url) {
      return '';
    }

    let videoId: string | null = null;
    const fullreg =
      /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;
    const match = fullreg.exec(url);
    if (match && match.length > 4) {
      videoId = match[4];
    }

    if (videoId) {
      const safeUrl = this.createYoutubeEmbed(videoId);
      // Санитизация URL перед возвращением
      return this.sanitizer.bypassSecurityTrustResourceUrl(safeUrl);
    }

    // Если URL не подходит под формат YouTube, не преобразовываем его
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'ytubePipe',
//   standalone: true,
// })
// export class YtubePipePipe implements PipeTransform {
//   createYoutubeEmbed = (key: string) => {
//     return 'https://www.youtube.com/embed/' + key;
//   };

//   transform(url: string): string {
//     if (!url) return url;

//     const linkreg = /(?:)<a([^>]+)>(.+?)<\/a>/g;
//     const fullreg =
//       /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;
//     const regex =
//       /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;

//     let resultHtml = url;

//     // get all the matches for youtube links using the first regex
//     const match = url.match(fullreg);
//     if (match && match.length > 0) {
//       // get all links and put in placeholders
//       const matchlinks = url.match(linkreg);
//       if (matchlinks && matchlinks.length > 0) {
//         for (let i = 0; i < matchlinks.length; i++) {
//           resultHtml = resultHtml.replace(
//             matchlinks[i],
//             '#placeholder' + i + '#'
//           );
//         }
//       }

//       // now go through the matches one by one
//       for (let i = 0; i < match.length; i++) {
//         // get the key out of the match using the second regex
//         const matchParts = match[i].split(regex);
//         // replace the full match with the embedded youtube code
//         resultHtml = resultHtml.replace(
//           match[i],
//           this.createYoutubeEmbed(matchParts[1])
//         );
//       }

//       // ok now put our links back where the placeholders were.
//       if (matchlinks && matchlinks.length > 0) {
//         for (let i = 0; i < matchlinks.length; i++) {
//           resultHtml = resultHtml.replace(
//             '#placeholder' + i + '#',
//             matchlinks[i]
//           );
//         }
//       }
//     }
//     return resultHtml;
//   }
// }
