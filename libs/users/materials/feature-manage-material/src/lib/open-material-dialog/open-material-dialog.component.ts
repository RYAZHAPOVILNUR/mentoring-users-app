import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Material } from '@users/materials-data-access';
import { MatIconModule } from '@angular/material/icon';
import { ResourceUrlSanitizer } from '../pipes/resource-url-sanitizer';
import { MATERIAL_TYPES } from '../../../../constants/material-types.constants';

@Component({
  selector: 'users-open-material-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, ResourceUrlSanitizer],
  templateUrl: './open-material-dialog.component.html',
  styleUrls: ['./open-material-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenMaterialDialogComponent {
  private readonly _dialogRef = inject(MatDialogRef<OpenMaterialDialogComponent>);
  public readonly material: Material = inject(MAT_DIALOG_DATA);

  private _extractVideoId(url: string): string | null {
    const match = url.match(MATERIAL_TYPES.VIDEO.validationRegex);
    return match ? match[4] : null;
  }

  public getPreviewVideoImage(url: string): string {
    const videoId = this._extractVideoId(url);
    const emptyImg = 'https://icon-library.com/images/photo-placeholder-icon/photo-placeholder-icon-14.jpg';
    return videoId ? `https://img.youtube.com/vi/${videoId}/sddefault.jpg` : emptyImg;
  }

  public getMaterialType(url: string): string {
    if (MATERIAL_TYPES.VIDEO.validationRegex.test(url)) {
      return 'video';
    }
    if (MATERIAL_TYPES.PDF.validationRegex.test(url)) {
      return 'pdf';
    }
    if (MATERIAL_TYPES.PODCAST.validationRegex.test(url)) {
      return 'podcast';
    }
    return 'unknown';
  }
}
