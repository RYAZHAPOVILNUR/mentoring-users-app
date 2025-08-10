import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'users-materials-content',
  imports: [CommonModule, PdfViewerModule, MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {
  public readonly data = inject(MAT_DIALOG_DATA);
  public readonly dialogRef = inject(MatDialogRef);

  public get videoId() {
    const match = this.data.material_link.match(/v=([^&]+)/);
    return match ? match[1] : null;
  }
  get thumbnailUrl(): string {
    return `https://img.youtube.com/vi/${this.videoId}/hqdefault.jpg`;
  }
  cancel() {
    this.dialogRef.close(true);
  }
}
