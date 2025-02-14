import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, PdfViewerModule],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent implements OnInit {
  public materialData = inject(MAT_DIALOG_DATA);
  private sanitizer = inject(DomSanitizer);
  public dialogRef = inject(MatDialogRef<MaterialsContentComponent>);
  public convertedVideoUrl: SafeResourceUrl | null = null;

  ngOnInit() {
    if (this.materialData.type === 'video') {
      const embedUrl = this.convertToEmbedUrl(this.materialData.material_link);
      this.convertedVideoUrl = this.sanitizeUrl(embedUrl);
    }
  }

  convertToEmbedUrl(url: string): string {
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/)([^&\n?#]+))/;
    const match = url.match(regex);
    return match && match[1] ? `https://www.youtube.com/embed/${match[1]}` : url;
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  close() {
    this.dialogRef.close();
  }
}
