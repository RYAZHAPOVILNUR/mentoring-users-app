import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    NgOptimizedImage,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    PdfViewerModule,
    MatIconModule],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsContentComponent {
  public data = inject(MAT_DIALOG_DATA);
  public dialogRef = inject(MatDialogRef<MaterialsContentComponent>);

  public materialLink: string = this.data.material.material_link;

  public extractYouTubeID(url: string ): string{
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})/;
    const match = url.match(youtubeRegex);
    return match ? match[1] : "not found";
  }

  public getImageYoutubeVideo(url: string ): string {
    return `https://i.ytimg.com/vi/${this.extractYouTubeID(url)}/maxresdefault.jpg`;
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
