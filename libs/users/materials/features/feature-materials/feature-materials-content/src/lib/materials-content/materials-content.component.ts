import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { FileTypeService } from '@shared/util-file-type';
import { Material } from '@users/materials/data-access-materials';

export interface MaterialsContentDialogData {
  material: Material;
}

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, PdfViewerModule],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
})
export class MaterialsContentComponent {
  protected readonly sanitizer = inject(DomSanitizer);
  public readonly dialogRef = inject(MatDialogRef<MaterialsContentComponent>);
  public readonly data: MaterialsContentDialogData = inject(MAT_DIALOG_DATA);
  public readonly fileTypeService = inject(FileTypeService);

  get material() {
    return this.data.material;
  }

  getFileType(): string {
    return this.fileTypeService.getFileType(this.material.material_link);
  }

  getAudioType(): string {
    return this.fileTypeService.getAudioMimeType(this.material.material_link);
  }

  getEmbedUrl(): string {
    const url = this.material.material_link;

    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = this.fileTypeService.extractYouTubeId(url);
      if (videoId && this.fileTypeService.isValidYouTubeId(videoId)) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    if (this.isValidUrl(url)) {
      return url;
    }

    return 'about:blank';
  }

  close(): void {
    this.dialogRef.close();
  }

  private isValidUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  }
}
