import { Injectable } from '@angular/core';

export type FileType = 'video' | 'audio' | 'pdf' | 'other';

@Injectable({ providedIn: 'root' })
export class FileTypeService {
  getFileType(url: string): FileType {
    const lowerUrl = url.toLowerCase();

    if (this.isVideoUrl(lowerUrl)) return 'video';
    if (this.isAudioUrl(lowerUrl)) return 'audio';
    if (this.isPdfUrl(lowerUrl)) return 'pdf';

    return 'other';
  }

  getFileIcon(url: string): string {
    const type = this.getFileType(url);

    const iconMap: Record<FileType, string> = {
      video: 'videocam',
      audio: 'audiotrack',
      pdf: 'picture_as_pdf',
      other: 'insert_drive_file',
    };

    return iconMap[type];
  }

  getFileIconClass(url: string): string {
    const type = this.getFileType(url);

    const classMap: Record<FileType, string> = {
      video: 'video-icon',
      audio: 'audio-icon',
      pdf: 'pdf-icon',
      other: 'default-icon',
    };

    return classMap[type];
  }

  getAudioMimeType(url: string): string {
    const lowerUrl = url.toLowerCase();

    if (lowerUrl.includes('.mp3')) return 'audio/mpeg';
    if (lowerUrl.includes('.wav')) return 'audio/wav';
    if (lowerUrl.includes('.ogg')) return 'audio/ogg';
    if (lowerUrl.includes('.m4a')) return 'audio/mp4';

    return 'audio/mpeg';
  }

  getValidationPattern(type: FileType): RegExp {
    const patterns: Record<FileType, RegExp> = {
      video: /^(https:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/,
      pdf: /^.+(\.pdf)$/,
      audio: /^.+(\.mp3|\.wav|\.ogg|\.m4a)$/,
      other: /^https?:\/\/.+/,
    };

    return patterns[type];
  }

  extractYouTubeId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }

  isValidYouTubeId(id: string): boolean {
    return /^[a-zA-Z0-9_-]{11}$/.test(id);
  }

  private isVideoUrl(url: string): boolean {
    return url.includes('youtube.com') || url.includes('youtu.be');
  }

  private isAudioUrl(url: string): boolean {
    return Boolean(url.match(/\.(mp3|wav|ogg|m4a)$/));
  }

  private isPdfUrl(url: string): boolean {
    return Boolean(url.match(/\.(pdf)$/));
  }
}
