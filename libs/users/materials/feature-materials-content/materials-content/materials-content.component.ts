import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Material } from '../../data-access/src';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [CommonModule, PdfViewerModule, MatIconModule, MatDialogModule, MatProgressBarModule],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {
  data = inject(MAT_DIALOG_DATA) as Material;
  dialogRef = inject(MatDialogRef<MaterialsContentComponent>);
  sanitizer = inject(DomSanitizer);
  safeUrl: SafeResourceUrl;

  constructor() {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.convertToEmbedUrl(this.data.material_link));
  }

  convertToEmbedUrl(watchUrl: string): string {
    return watchUrl.replace(/https:\/\/www\.youtube\.com\/watch\?v=([^&]+)/, 'https://www.youtube.com/embed/$1');
  }


}
