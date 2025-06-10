import { ChangeDetectionStrategy, Component, Inject, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PDFDocumentProxy, PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'lib-materials-content-add',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressBar,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    PdfViewerModule,
  ],
  templateUrl: './materials-content-add.component.html',
  styleUrl: './materials-content-add.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentAddComponent {
  private dialogRef = inject(MatDialogRef<MaterialsContentAddComponent>);

  public formGroup: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { materialType: string }) {
    this.formGroup = new FormGroup({
      // Создайте FormControl для каждого поля в вашей форме
      materialName: new FormControl('', [Validators.required]),
      materialLink: new FormControl('', [Validators.required]),
    });
  }

  public error = '';
  public link = '';
  public loading = false;
  public canCreate = false;
  public materialName = '';
  public materialLink = '';

  createMaterial() {
    if (this.isLinkValid(this.formGroup.value.materialLink)) {
      const formData = this.formGroup.value;
      const materialData = {
        title: formData.materialName,
        material_link: formData.materialLink,
      };
      this.dialogRef.close(materialData);
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.error = '';
      this.loading = true;
      const formData = this.formGroup.value;
      this.link = formData.materialLink;
    }
  }

  onInput() {
    this.canCreate = false;
    this.error = '';
  }

  callBackFn(pdf: PDFDocumentProxy) {
    this.canCreate = true;
    this.error = '';
    this.loading = false;
  }

  callBackVideo() {
    this.canCreate = true;
    this.error = '';
    this.loading = false;
  }

  onError(error: any) {
    this.loading = false;
    this.error = 'Ошибка! Ссылка не прошла проверку!';
  }

  public isLinkValid(link: string): boolean {
    if (this.data.materialType === 'Video') {
      const videoRegex = /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/;
      return videoRegex.test(link);
    }

    if (this.data.materialType === 'PDF') {
      const pdfRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.pdf$/;
      return pdfRegex.test(link);
    }

    if (this.data.materialType === 'Audio') {
      const audioRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.mp3$/;
      return audioRegex.test(link);
    }

    return true;
  }
}
