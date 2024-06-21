import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent {
  public materialType = inject(MAT_DIALOG_DATA);
  public fb = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>)

  public formGroup = this.fb.group({
    name: ['', Validators.required],
    link: ['', Validators.required]
  })

  public isLinkValid(link: string): boolean {
    if (this.materialType === 'Видео') {
      const videoRegex = /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/
      return videoRegex.test(link);
    }

    if (this.materialType === 'PDF') {
      const pdfRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.pdf$/
      return pdfRegex.test(link);
    }

    if (this.materialType === 'Подкаст') {
      const audioRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.mp3$/
      return audioRegex.test(link);
    }

    return true;
  }

  public save() {
    if (this.formGroup.valid  && this.isLinkValid(this.formGroup.getRawValue().link as string)) {
      const formData = {
        title: this.formGroup.value.name,
        material_link: this.formGroup.value.link,
      };
      this.dialogRef.close(formData);
    }
  }

  public close() {
    this.dialogRef.close();
  }
}
