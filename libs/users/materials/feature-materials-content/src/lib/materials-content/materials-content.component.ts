import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TMaterialDTO } from '@users/materials/data-access';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EMaterialFormat, EMaterialType } from './materials-content.interface';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const MaterialFormat: { [key: string]: EMaterialType } = {
  'youtube': EMaterialType.video,
  'mp3': EMaterialType.podcast,
  'pdf': EMaterialType.pdf
}

@Component({
  selector: 'users-feature-materials-content',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    PdfViewerModule,
  ],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.css'],
})
export class MaterialsContentComponent {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly dialogRef = inject(MatDialogRef<MaterialsContentComponent>);
  private readonly data = inject<{ material: TMaterialDTO }>(MAT_DIALOG_DATA);

  public readonly materialTitle = this.data.material.title;
  public readonly materialLink = this.data.material.material_link;
  public readonly materialFormat = this.getMaterialFormat(this.data.material.material_link);
  public readonly materialType = EMaterialType;

  public close(): void {
    this.dialogRef.close();
  }

  public getMaterialFormat(materialLink: string): EMaterialType | undefined  {
    const keys = Object.keys(MaterialFormat);
    for (const key of keys) {
      if (materialLink.endsWith(key)) {
        return MaterialFormat[key]
      }
    }
    return materialLink.includes(EMaterialType.video) ? EMaterialType.video : undefined;
  }

  public getPreviewType(): EMaterialFormat | null {
    const playerMatch = this.materialLink.match(/|\/embed\/([a-zA-Z0-9_-]{11})[?&]si=([a-zA-Z0-9_-]{16})/);
    const imgMatch = this.materialLink.match(/^https:\/\/www\.youtube\.com\/watch\?v=[\w-]/);
    return imgMatch ? EMaterialFormat.image : playerMatch ? EMaterialFormat.video : null;
  }

  public getPlayerPreview(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.materialLink);
  }

  public getVideoPreview(): string | null {
    const match = this.materialLink.match(/[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/);
    return `https://img.youtube.com/vi/${match ? match[1] || match[2] : null}/maxresdefault.jpg`;
  }
}
