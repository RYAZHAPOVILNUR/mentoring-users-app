import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PDFProgressData, PdfViewerModule } from 'ng2-pdf-viewer';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'users-view-material-content-dialog',
  standalone: true,
  imports: [CommonModule, PdfViewerModule, MatProgressBarModule],
  templateUrl: './view-material-content-dialog.component.html',
  styleUrls: ['./view-material-content-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewMaterialContentDialogComponent {
  public readonly data: any = inject(MAT_DIALOG_DATA);
  materialLink = this.data.material.material_link;
  public loadedProgress = true;

  onProgress(progressData: PDFProgressData) {
    if (progressData.total === progressData.loaded) {
      this.loadedProgress = false}}
}
