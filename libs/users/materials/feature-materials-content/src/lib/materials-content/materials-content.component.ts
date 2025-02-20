import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialInterface } from '@users/materials/data-access';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {
  isPdf: boolean;
  isMp3: boolean;
  isYoutube: boolean;
  youtubeEmbedUrl?: SafeResourceUrl;

  constructor(
    public dialogRef: MatDialogRef<MaterialsContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { material: MaterialInterface },
    private sanitizer: DomSanitizer
  ) {
    const link = data.material.material_link.toLowerCase();
    this.isPdf = link.includes('.pdf');
    this.isMp3 = link.includes('.mp3');
    this.isYoutube = link.includes('https://www.youtu');

    if (this.isYoutube) {
      this.youtubeEmbedUrl = this.sanitizeYoutubeUrl(data.material.material_link);
    }
  }

  sanitizeYoutubeUrl(url: string): SafeResourceUrl {
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (videoIdMatch && videoIdMatch[1]) {
      const embedUrl = `https://www.youtube.com/embed/${videoIdMatch[1]}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  cancel() {
    this.dialogRef.close();
  }
}
