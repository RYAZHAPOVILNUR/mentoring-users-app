import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CreateMaterialsButtonComponent } from '../create-materials-button/create-materials-button.component';

@Component({
  selector: 'users-create-materials-dialog',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './create-materials-dialog.component.html',
  styleUrls: ['./create-materials-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateMaterialsDialogComponent {
  private readonly fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CreateMaterialsButtonComponent, { buttonText: string, title: string, url: string }>);
  public data: { buttonText: string, title: string, url: string } = inject(MAT_DIALOG_DATA);

  public formGroup = this.fb.group({
    title: ['', Validators.required],
    url: ['', Validators.required],
  });

  public isLinkValid(link: string): boolean {
    if (this.data.buttonText === 'Видео') {
      const videoRegex = /[?&]v=([a-zA-Z0-9_-]{11})|\/embed\/([a-zA-Z0-9_-]{11})/
      return videoRegex.test(link);
    }

    if (this.data.buttonText === 'Файл PDF') {
      const pdfRegex = /.*\.pdf/
      return pdfRegex.test(link);
    }

    if (this.data.buttonText === 'Подкаст') {
      const audioRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.mp3$/
      return audioRegex.test(link);
    }

    return true;
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public save(): void {
    if (this.formGroup.valid) {
      const formData = {
        title: this.formGroup.value.title,
        url: this.formGroup.value.url,
      }
      this.dialogRef.close(formData);
    }
  }
}
