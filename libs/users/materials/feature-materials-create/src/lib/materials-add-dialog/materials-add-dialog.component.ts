import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsAddDialogComponent {
  public formGroup: FormGroup;
  private formBuilder = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { materialType: string, materialTitle: string, materialLink: string },) {
    this.formGroup = this.formBuilder.group({
      materialTitle: ['', Validators.required],
      materialLink: ['', Validators.required]
    })
  }

  public isLinkValid(link: string): boolean {
    if (this.data.materialType === 'Видео') {
      const videoRegex = /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/
      return videoRegex.test(link);
    }

    if (this.data.materialType === 'PDF') {
      const pdfRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.pdf$/
      return pdfRegex.test(link);
    }

    if (this.data.materialType === 'Подкаст') {
      const audioRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.mp3$/
      return audioRegex.test(link);
    }

    return true;
  }

  public close(): void {
    this.dialogRef.close()
  }

  public save(): void {
    if (this.formGroup.valid && this.isLinkValid(this.formGroup.value.materialLink)) {
      const newMaterial = {
        materialTitle: this.formGroup.value.materialTitle,
        materialLink: this.formGroup.value.materialLink
      }

      this.dialogRef.close(newMaterial)
    }
  }
}
