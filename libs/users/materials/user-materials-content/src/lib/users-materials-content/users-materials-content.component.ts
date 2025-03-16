import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'materials-content',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    NgxExtendedPdfViewerModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './users-materials-content.component.html',
  styleUrls: ['./users-materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMaterialsContentComponent implements OnInit {
  videoUrl: SafeResourceUrl | null = null;

  private sanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    if (this.videoId) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${this.videoId}`
      );
    }
  }
  public data = inject(MAT_DIALOG_DATA);
  public dialogRef = inject(MatDialogRef<UserMaterialsContentComponent>);

  get materialLink(): string {
    return this.data?.material?.material_link || '';
  }

  get isAudio(): boolean {
    const result = this.materialLink?.endsWith('.mp3') ?? false;
    console.log('isAudio:', result);
    return result;
  }

  get isPdf(): boolean {
    const result = this.materialLink?.endsWith('.pdf') ?? false;
    console.log('isPdf:', result);
    return result;
  }

  get isVideo(): boolean {
    const result = !this.isPdf && !this.isAudio;
    console.log('isVideo:', result);
    return result;
  }

  get videoId(): string | null {
    const youtubeRegex =
      /(?:youtube\.com\/.*[?&]v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
    const match = this.materialLink?.match(youtubeRegex);
    return match ? match[1] : null;
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
