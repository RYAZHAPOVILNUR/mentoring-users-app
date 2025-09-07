import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { YoutubeThumbnailPipe } from '../pipes/youtube-thumbnail-pipe.pipe';
@Component({
  selector: 'users-material-content',
  imports: [CommonModule, YoutubeThumbnailPipe, PdfViewerModule, MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './material-content.component.html',
  styleUrls: ['./material-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialContentComponent {
  public readonly data = inject(MAT_DIALOG_DATA);
  public readonly dialogRef = inject(MatDialogRef);

  cancel() {
    this.dialogRef.close(true);
  }
}
