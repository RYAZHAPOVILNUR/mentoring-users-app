import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

import { CropperDialogData } from '../../interfaces/cropper-dialog-data.interface';
import { CropperDialogCloseData } from '../../types/cropper-dialog-close-data.type';

type DialogRef = MatDialogRef<CropperDialogComponent, CropperDialogCloseData>;

@Component({
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDialogClose, ImageCropperComponent],
  templateUrl: './cropper-dialog.component.html',
  styleUrls: ['./cropper-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CropperDialogComponent {
  private readonly dialogRef = inject<DialogRef>(MatDialogRef);
  private readonly data = inject<CropperDialogData>(MAT_DIALOG_DATA);

  private croppedImg = '';

  readonly imageBase64 = this.data.imageSrc;

  cropImg({ base64 }: ImageCroppedEvent): void {
    if (base64) {
      this.croppedImg = base64;
    }
  }

  onCrop(): void {
    this.dialogRef.close(this.croppedImg);
  }
}
