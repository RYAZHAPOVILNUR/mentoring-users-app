import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-cropper-dialog',
  standalone: true,
  imports: [CommonModule, ImageCropperComponent, MatButtonModule, MatIconModule],
  templateUrl: './cropper-dialog.component.html',
  styleUrls: ['./cropper-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CropperDialogComponent {
  public croppedImg: any = '';
  private readonly dialogRef = inject(MatDialogRef<CropperDialogComponent>);
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
