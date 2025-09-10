import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { MaterialContentDialogData } from './material-content-dialog-data.interface';
import { YoutubeThumbnailPipe } from '../pipes/youtube-thumbnail-pipe.pipe';

type DialogRef = MatDialogRef<MaterialContentDialogComponent, void>;

@Component({
  selector: 'users-material-content-dialog',
  imports: [CommonModule, YoutubeThumbnailPipe, PdfViewerModule, MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './material-content-dialog.component.html',
  styleUrls: ['./material-content-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialContentDialogComponent {
  public readonly data = inject<MaterialContentDialogData>(MAT_DIALOG_DATA);
  public readonly dialogRef = inject<DialogRef>(MatDialogRef);

  cancel() {
    this.dialogRef.close();
  }
}
