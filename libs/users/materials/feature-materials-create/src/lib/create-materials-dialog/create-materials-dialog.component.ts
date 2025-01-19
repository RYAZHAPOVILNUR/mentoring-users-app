import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-create-materials-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule],
  templateUrl: './create-materials-dialog.component.html',
  styleUrls: ['./create-materials-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMaterialsDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<CreateMaterialsDialogComponent>);
  public materialType: 'audio' | 'video' | 'pdf' = inject(MAT_DIALOG_DATA).type;

  public formGroup = new FormBuilder().group({
    title: new FormControl('', [Validators.required]),
    material_link: new FormControl('', [this.getLinkValidator(this.materialType), Validators.required]),
  });

  public onSubmit() {
    this.dialogRef.close(this.formGroup.value);
  }

  private getLinkValidator(type: 'audio' | 'video' | 'pdf') {
    switch (type) {
      case 'audio':
        return this.audioLinkValidator;
      case 'pdf':
        return this.pdfLinkValidator;
      case 'video':
        return this.videoLinkValidator;
    }
  }

  private audioLinkValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && !value.endsWith('.mp3')) {
      return { audioLink: true };
    }
    return null;
  }

  private pdfLinkValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && !value.endsWith('.pdf')) {
      return { pdfLink: true };
    }
    return null;
  }

  private videoLinkValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const youtubeRegex = /^(https?:\/\/)?(www\.youtube\.com|youtu\.be)\/(watch\?v=[a-zA-Z0-9_-]+)/;
    if (value && !youtubeRegex.test(value)) {
      return { videoLink: true };
    }
    return null;
  }
}
