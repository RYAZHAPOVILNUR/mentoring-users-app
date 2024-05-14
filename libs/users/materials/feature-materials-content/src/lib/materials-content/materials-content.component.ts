import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatButtonModule } from '@angular/material/button';
import { OpenMaterialData } from '@users/materials/data-access'

@Component({
  selector: 'users-feature-materials-content',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    PdfViewerModule,
    MatButtonModule,
  ],
  templateUrl: './materials-content.component.html',
  styleUrls: ['./materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentComponent {
  public readonly data: OpenMaterialData = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<MaterialsContentComponent, boolean>);

  close(): void {
    return this.dialogRef.close();
  }

  getVideoId(): string {
    const youtubeRegex = /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w\-]{10,12})\b/;
    const match = this.data.link.match(youtubeRegex);
    return match ? match[1] || match[2] : ''
  }
}
