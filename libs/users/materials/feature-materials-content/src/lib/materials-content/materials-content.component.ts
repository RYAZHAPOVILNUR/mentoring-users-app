import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SafeUrlPipe } from '../../../../util/pipes/safe-url.pipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-materials-content',
  standalone: true,
  imports: [CommonModule, MatDialogModule, SafeUrlPipe, PdfViewerModule, MatButtonModule],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {
  protected readonly data: { type: string; link: string } = inject(MAT_DIALOG_DATA);
  public dialogRef = inject(MatDialogRef<MaterialsContentComponent>);

  close() {
    this.dialogRef.close();
  }
}
