import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MaterialType, PreviewType } from './materials-list-content.enum';

import { Material } from '@users/materials/data-access';

import { PdfViewerModule } from 'ng2-pdf-viewer';

const typeMap: { [key: string]: MaterialType } = {
  'pdf': MaterialType.pdf,
  'mp3': MaterialType.audio,
  'youtube': MaterialType.youtube,
};

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, PdfViewerModule, NgOptimizedImage],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<MaterialsContentComponent>);
  protected readonly PreviewType = PreviewType;
  protected readonly MaterialType = MaterialType;

  public readonly materialContent: Material = inject(MAT_DIALOG_DATA);
  public materialType: MaterialType | undefined;

  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit(): void {
    const { material_link } = this.materialContent;
    this.materialType = this.getFileType(material_link);
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public getFileType(url: string): MaterialType | undefined  {
    const keys = Object.keys(typeMap);
    for (const key of keys) {
      if (url.endsWith(key)) {
        return typeMap[key];
      }
    }

    return url.includes(MaterialType.youtube) ? MaterialType.youtube : undefined;
  }

  public getPreviewType() {
    const youtubePlayerRegex = /|\/embed\/([a-zA-Z0-9_-]{11})[?&]si=([a-zA-Z0-9_-]{16})/;
    const youtubePreviewRegex = /^https:\/\/www\.youtube\.com\/watch\?v=[\w-]+$/;
    const playerMatch = this.materialContent.material_link.match(youtubePlayerRegex);
    const imgMatch = this.materialContent.material_link.match(youtubePreviewRegex);

    return imgMatch ? PreviewType.image : playerMatch ? PreviewType.video : null;
  }

  public getPlayerPreview(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.materialContent.material_link);
  }

  public getVideoPreview(): string | null {
    const youtubePreviewRegex = /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/;
    const match = this.materialContent.material_link.match(youtubePreviewRegex);

    return `https://img.youtube.com/vi/${match ? match[1] || match[2] : null}/maxresdefault.jpg`;
  }
}
