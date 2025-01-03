import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, PdfViewerModule, MatDialogModule],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
})
export class MaterialsContentComponent implements OnInit {
  readonly data = inject(MAT_DIALOG_DATA);
  sanitizer = inject(DomSanitizer);
  sanitizedUrl!: SafeResourceUrl;

  ngOnInit(): void {
    const embedUrl = this.extractEmbedUrl(this.data.material_link);
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  extractEmbedUrl(url: string): string {
    const videoIdMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})|youtu\.be\/([a-zA-Z0-9_-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] || videoIdMatch[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '12';
  }
}
