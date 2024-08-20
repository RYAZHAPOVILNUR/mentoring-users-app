import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'materials-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
  ],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent {
  public readonly data = inject(MAT_DIALOG_DATA);
  private readonly formBuilder = inject(FormBuilder);
  public readonly dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>);
  public readonly youTubeLinkRegExp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/

  public formGroup: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    link: ['', [Validators.required, this.linkValidator()]],
  });

  cancel() {
    this.dialogRef.close();
  }
  save() {
    if (this.formGroup.valid) {
      const formData = {
        title: this.formGroup.value.title,
        link: this.formGroup.value.link,
      };
      this.dialogRef.close(formData);
    }
  }

  constructor() {
    console.log('data materialType', this.data.materialType);
  }

  linkValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const link = control.value;
      let isLink = Boolean(link.startsWith('https://') | link.startsWith('http://'))
      let isCorrectFileType = false;

      if (this.data.materialType == 'PDF') {
        isCorrectFileType = link.endsWith('.pdf')
      }
      if (this.data.materialType == 'подкаст или аудиофайл') {
        isCorrectFileType = link.endsWith('.mp3')
      }
      if (this.data.materialType == 'видео') {
        isCorrectFileType = this.youTubeLinkRegExp.test(link)
      }

      let isLinkValid = isLink && isCorrectFileType;

      return isLinkValid ? null : { linkInvalid: true };
    };
  }
}
