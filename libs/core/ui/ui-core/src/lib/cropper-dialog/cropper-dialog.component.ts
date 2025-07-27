import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'users-cropper-dialog',
  standalone: true,
  imports: [CommonModule, ImageCropperComponent, MatButtonModule, MatIconModule],
  templateUrl: './cropper-dialog.component.html',
  styleUrls: ['./cropper-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CropperDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<CropperDialogComponent>);
  public croppedImg = '';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public readonly data: any = inject(MAT_DIALOG_DATA);
  public readonly imageBase64 = this.data.image.src;

  cropImg(e: ImageCroppedEvent) {
    console.log(e);
    if (e.base64) {
      this.croppedImg = e.base64;
    }
  }

  onCrop() {
    const croppedImageData = this.croppedImg;
    this.dialogRef.close(croppedImageData);
  }

  onClose() {
    this.dialogRef.close(false);
  }
}
