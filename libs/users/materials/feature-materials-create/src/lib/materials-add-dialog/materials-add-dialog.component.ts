import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent {
  readonly dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  public formGroup = new FormGroup({
    materialTitle: new FormControl('', Validators.required),
    materialLink: new FormControl('', Validators.required),
  });

  public isLinkValid(link: string): boolean {
    if (!link) return false;
    if (this.data.typeMaterial === 'Видео') {
      const videoRegex = /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/;
      return videoRegex.test(link);
    }

    if (this.data.typeMaterial === 'PDF') {
      const pdfRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.pdf$/;
      return pdfRegex.test(link);
    }

    if (this.data.typeMaterial === 'Подкаст') {
      const audioRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.mp3$/;
      return audioRegex.test(link);
    }

    return true;
  }

  public onSave(): void {
    const newMaterial = {
      materialTitle: this.formGroup.value.materialTitle,
      materialLink: this.formGroup.value.materialLink,
    };

    this.dialogRef.close(newMaterial);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
