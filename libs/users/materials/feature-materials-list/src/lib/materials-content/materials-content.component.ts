import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [CommonModule, PdfViewerModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent  {
  public isPlayerActive: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<MaterialsContentComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly selectedMaterial: { materialLink: string; title: string },
    private sanitizer: DomSanitizer,
  ) {}

  public isPdf(): boolean {
    return this.selectedMaterial?.materialLink.endsWith('.pdf')
  }

  public isAudio() {
    return this.selectedMaterial.materialLink.endsWith('.mp3');
  }

  public isYouTubeVideo(): boolean {
    const link = this.selectedMaterial?.materialLink || '';
    return link.includes('youtu') || link.includes('youtube.com');
  }

  public convertedYouTubeLink(link: string): SafeResourceUrl {
    const embedUrl = link.replace('watch?v=', 'embed/');
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  public getPosterLink(): string {
    if (this.isYouTubeVideo()) {
      const videoId = this.extractYouTubeVideoId(this.selectedMaterial.materialLink);
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return '';
  }

  private extractYouTubeVideoId(link: string): string {
    const regex = /(?:youtube\.com\/.*(?:\/|v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = link.match(regex);
    return match ? match[1] : '';
  }

  public activatePlayer(): void {
    this.isPlayerActive = true;
  }

  public isEmptyMaterial(): boolean {
    return !this.isAudio() && !this.isPdf() && !this.isYouTubeVideo();
  }

  public getTitle(): string {
    return this.isEmptyMaterial() ? 'Пусто' : this.selectedMaterial.title;
  }

}
