import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDTO } from '@users/materials/data-access';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatButtonModule } from '@angular/material/button';
import { LinkAnalyzerPipe } from '../../../../../core/pipes/link-analyzer.pipe';

export const youTubeRegExp = /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w\-]{10,12})\b/;

@Component({
  selector: 'users-materials-content',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, PdfViewerModule, MatButtonModule, LinkAnalyzerPipe, LinkAnalyzerPipe],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {
  public readonly data: Pick<MaterialDTO, 'title' | 'material_link'> = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<MaterialsContentComponent, boolean>)

  close(): void {
    return this.dialogRef.close();
  }

  getVideoId(): string {
    const match = this.data.material_link.match(youTubeRegExp);
    return match ? match[1] || match[2] : '';
  }
}
