import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-pdf-viewer-dialog',
  standalone: true,
  imports: [CommonModule, PdfViewerModule, MatIconModule, MatCardModule, MatButtonModule],
  templateUrl: './pdf-viewer-dialog.component.html',
  styleUrls: ['./pdf-viewer-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfViewerDialogComponent {
  public readonly data = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef);

  onDialogClose() {
    this.dialogRef.close();
  }
}
