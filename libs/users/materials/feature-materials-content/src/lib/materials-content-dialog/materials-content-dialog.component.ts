import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface IMaterialData {
  materialLink: string;
  title: string;
}

type TRegEXFormats = 'video' | 'audio' | 'pdf';

@Component({
  selector: 'materials-materials-content-dialog',
  standalone: true,
  imports: [CommonModule, NgIf, MatFormFieldModule, MatButtonModule, MatDialogModule, MatIconModule, PdfViewerModule],
  templateUrl: './materials-content-dialog.component.html',
  styleUrls: ['./materials-content-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentDialogComponent {
  private readonly dialogRef: MatDialogRef<MaterialsContentDialogComponent> = inject(
    MatDialogRef<MaterialsContentDialogComponent>
  );
  private readonly domSanitizer = inject(DomSanitizer);
  public readonly data: IMaterialData = inject(MAT_DIALOG_DATA);

  public onCheckFileType(): string {
    const { materialLink } = this.data;
    switch (true) {
      case materialLink.endsWith('.pdf'):
        return 'pdf';
      case materialLink.endsWith('.mp3'):
        return 'audio';
      case materialLink.includes('youtube.com'):
        return 'video';
      default:
        return 'insert_drive_file';
    }
  }

  public onGetSecurityUrl(materialType: TRegEXFormats): SafeResourceUrl {
    const materialLink = this.data.materialLink;
    const regEXFormats = {
      pdf: /^https:\/\/.*\.pdf$/,
      video: /^https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
      audio: /^https:\/\/.*\.mp3$/,
    };
    const regExResult = materialLink.match(regEXFormats[materialType]);

    const getDomSanitizerURL = (URL: string): SafeResourceUrl => {
      return this.domSanitizer.bypassSecurityTrustResourceUrl(URL);
    };

    switch (materialType) {
      case 'audio':
        if (regExResult && regExResult[0]) {
          return getDomSanitizerURL(`${materialLink}`);
        }
        console.log('else audio');
        return getDomSanitizerURL('https://www.sousound.com/music/healing/healing_01.mp3');
      case 'pdf':
        if (regExResult && regExResult[0]) {
          return `${materialLink}`;
        }
        return 'https://www.orimi.com/pdf-test.pdf';
      case 'video':
        if (regExResult && regExResult[1]) {
          return getDomSanitizerURL('https://www.youtube.com/embed/' + regExResult[1]);
        }
        return getDomSanitizerURL('https://www.youtube.com/embed/dQw4w9WgXcQ?si=IzHtdH_qqisyNmGm');
      default:
        return getDomSanitizerURL('https://www.youtube.com/embed/dQw4w9WgXcQ?si=IzHtdH_qqisyNmGm');
    }
  }
}
