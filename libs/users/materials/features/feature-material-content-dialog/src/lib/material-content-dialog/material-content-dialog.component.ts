import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { MaterialContentDialogData } from './material-content-dialog-data.type';
import { YoutubeIdPipe } from '../pipes/youtube-Id.pipe';

type DialogRef = MatDialogRef<MaterialContentDialogComponent, true>;

@Component({
  selector: 'users-material-content-dialog',
  imports: [
    CommonModule,
    YoutubeIdPipe,
    YouTubePlayerModule,
    PdfViewerModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './material-content-dialog.component.html',
  styleUrls: ['./material-content-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialContentDialogComponent {
  private readonly dialogRef = inject<DialogRef>(MatDialogRef);
  public readonly data = inject<MaterialContentDialogData>(MAT_DIALOG_DATA);

  public cancel() {
    this.dialogRef.close();
  }
}
