import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule, PdfViewerModule],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
})
export class MaterialsContentComponent {
  public data = inject(MAT_DIALOG_DATA);
  private readonly dialog = inject(MatDialog);
  public dialogRef = inject(MatDialogRef<MaterialsContentComponent>);
  public materialLink: string = this.data.material.material_link;
  public extractYouTubeID(url: string ): string{
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : "not found";
  }
  public getImageYoutubeVideo(url: string ): string {
    return `https://i.ytimg.com/vi/${this.extractYouTubeID(url)}/maxresdefault.jpg`;
  }
  public onClose(): void {
    this.dialogRef.close();
  }
}
