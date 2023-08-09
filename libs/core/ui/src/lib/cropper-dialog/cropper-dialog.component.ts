import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CropperSettings, ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'users-cropper-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ImageCropperModule
  ],
  templateUrl: './cropper-dialog.component.html',
  styleUrls: ['./cropper-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CropperDialogComponent {
  imageBase64 = '';
  cropImgPreview: any = '';
  sanitizer = inject(DomSanitizer)

  cropperSettings: CropperSettings;

  public data: any = inject(MAT_DIALOG_DATA)

  constructor() {
    this.cropperSettings = new CropperSettings();
    this.imageBase64 = this.data.image.src
  }

  cropImg(e: ImageCroppedEvent) {
    this.cropImgPreview = e.objectUrl;
  }
  imgLoad() {
    // display cropper tool
  }
  initCropper() {
    // init cropper
  }

  imgFailed() {
    // error msg
  }

  onCrop() {
    console.log('cropped')
  }
}
