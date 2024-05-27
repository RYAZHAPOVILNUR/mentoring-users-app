import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatButtonModule } from '@angular/material/button';
import { OpenMaterialData } from '@users/materials/data-access';

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
  public readonly data = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<MaterialsContentComponent>);

  close(): void {
    return this.dialogRef.close()
  }

  getVideoId(): string | null {
    const youtubeRegex = /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/;;
    const match = this.data.material.material_link.match(youtubeRegex);
    return match ? match[1] || match[2] : ''
  }
}
