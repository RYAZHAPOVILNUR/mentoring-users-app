import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Material } from '@users/materials/data-access';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, PdfViewerModule],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {
  public readonly link: string = this.data.material.material_link

  constructor(@Inject(MAT_DIALOG_DATA) public data: { material: Material }, public sanitizer: DomSanitizer){}

  public getVideoPreviewUrl(): string {
    const videoIdMatch = this.link.match(/[?&]v=([^&]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : ''
  }
}
