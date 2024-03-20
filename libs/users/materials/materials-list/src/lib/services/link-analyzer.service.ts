import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkAnalyzerService {
  analyzeLink(link: string): string {
    if (this.isYouTubeVideo(link)) {
      return 'video_library';
    } else if (this.isAudio(link)) {
      return 'library_music';
    } else if (this.isDocument(link)) {
      return 'picture_as_pdf';
    } else {
      return 'attach_file';
    }
  }

  private isYouTubeVideo(link: string): boolean {
    if (link.includes('youtube.com') || link.includes('youtu.be')) return true;
    const videoExtensions = ['mp4', 'avi']
    return videoExtensions.some(ext => link.toLowerCase().endsWith(ext));
  }

  private isAudio(link: string): boolean {
    const audioExtensions = ['.mp3', '.aac', '.wav', '.flac', '.ogg'];
    return audioExtensions.some(ext => link.toLowerCase().endsWith(ext));
  }

  private isDocument(link: string): boolean {
    const documentExtensions = ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx'];
    return documentExtensions.some(ext => link.toLowerCase().endsWith(ext));
  }
}
