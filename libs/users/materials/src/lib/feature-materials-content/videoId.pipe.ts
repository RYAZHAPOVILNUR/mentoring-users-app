import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
    name: 'videoId',
    standalone: true
})
export class VideoIdPipe implements PipeTransform {
    transform(link: string): SafeResourceUrl | null {
        const videoRegex = /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w\-]{10,12})\b/;
        const match = link.match(videoRegex);
        if(match) return match[1]
        
        console.error('error video id');
        return null;
    }
}