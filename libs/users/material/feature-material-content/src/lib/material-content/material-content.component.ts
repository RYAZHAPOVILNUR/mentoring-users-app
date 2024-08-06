import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatIconModule } from '@angular/material/icon';
import { Material } from '@users/material';

@Component({
  selector: 'users-material-content',
  standalone: true,
  imports: [CommonModule, PdfViewerModule, MatIconModule, MatDialogModule],
  templateUrl: './material-content.component.html',
  styleUrls: ['./material-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialContentComponent {
  public data: Material = inject(MAT_DIALOG_DATA);
  public dialog = inject(MatDialog);
  public dialogRef = inject(MatDialogRef);

  public close(): void {
    console.log(this.data);
    this.dialogRef.close();
  }

  public getVideoId(): string | null {
    const youtubeRegex = /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})|youtu\.be\/([a-zA-Z0-9_-]{11})/;
    const match = youtubeRegex.exec(this.data.material_link);
    return match ? match[1] || match[2] || match[3] : null;
  }
}
