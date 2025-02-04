import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'users-material-content',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    PdfViewerModule,
    MatIconModule
  ],
  templateUrl: './material-content.component.html',
  styleUrls: ['./material-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialContentComponent {
  public data = inject(MAT_DIALOG_DATA);
  private readonly dialog = inject(MatDialog);
  public dialogRef = inject(MatDialogRef<MaterialContentComponent>);
  private sanitizer = inject(DomSanitizer);

  public materialLink: string = this.data.material.material_link;
  public safeMaterialLink: SafeResourceUrl;
  public safeAudioUrl: SafeResourceUrl | null = null;
  public audioElement: HTMLAudioElement | null = null;

  constructor() {
    this.safeMaterialLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.materialLink);
    
    if (this.isSoundCloud()) {
      this.safeAudioUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.materialLink);
    }

  }

  isPdf(): boolean {
    return this.materialLink.toLowerCase().split('?')[0].endsWith('.pdf');
  }

  isExternalPdf(): boolean {
    return this.isPdf() && this.materialLink.startsWith('http');
  }

  isSoundCloud(): boolean {
    return this.materialLink.includes('soundcloud.com');
  }

  public getGoogleDocsViewerUrl(): SafeResourceUrl {
    const url = `https://docs.google.com/viewer?url=${encodeURIComponent(this.materialLink)}&embedded=true`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public getVideoId(): string | null {
    const youtubeRegex = /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/;
    const match = this.materialLink.match(youtubeRegex);
    return match ? match[1] || match[2] : null;
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public getSoundCloudEmbedUrl(): SafeResourceUrl {
    const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(this.materialLink)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}