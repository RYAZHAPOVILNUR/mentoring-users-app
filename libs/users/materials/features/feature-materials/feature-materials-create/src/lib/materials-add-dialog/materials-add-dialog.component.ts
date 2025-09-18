import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatError, MatFormField, MatInput } from '@angular/material/input';

import { FileTypeService } from '@shared/util-file-type';

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && isSubmitted && control.touched);
  }
}

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormField,
    MatInput,
    MatError,
    MatButton,
    MatIcon,
  ],
  templateUrl: './materials-add-dialog.component.html',
  styleUrl: './materials-add-dialog.component.scss',
})
export class MaterialsAddDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>);
  private readonly fileTypeService = inject(FileTypeService);

  private readonly iconMap = {
    video: 'videocam',
    pdf: 'picture_as_pdf',
    audio: 'audiotrack',
  };
  public readonly data: { type: 'video' | 'pdf' | 'audio' } = inject(MAT_DIALOG_DATA);
  public matcher = new MyErrorStateMatcher();

  materialForm: FormGroup;

  constructor() {
    this.materialForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      material_link: [
        '',
        [Validators.required, Validators.pattern(this.fileTypeService.getValidationPattern(this.data.type))],
      ],
    });
  }

  get title() {
    return this.materialForm.get('title');
  }

  get material_link() {
    return this.materialForm.get('material_link');
  }

  get icon() {
    return this.iconMap[this.data.type];
  }

  getDialogTitle(): string {
    switch (this.data.type) {
      case 'video':
        return 'Добавить видео';
      case 'pdf':
        return 'Добавить PDF';
      case 'audio':
        return 'Добавить аудио';
      default:
        return 'Добавить материал';
    }
  }

  getLinkErrorText(): string {
    switch (this.data.type) {
      case 'video':
        return 'Введите корректную ссылку на YouTube видео';
      case 'pdf':
        return 'Ссылка должна вести на PDF файл';
      case 'audio':
        return 'Ссылка должна вести на аудио файл (MP3, WAV, OGG, M4A)';
      default:
        return 'Введите корректную ссылку';
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.materialForm.valid) {
      this.dialogRef.close(this.materialForm.value);
    }
  }
}
