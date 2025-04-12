import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { newMaterial } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  materialsForm!: FormGroup;

  ngOnInit() {
    const materialType = this.data?.materialType ?? '';

    this.materialsForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      material_link: new FormControl('', [
        Validators.required,
        this.materialLinkValidator(materialType)
      ]),
      folder_id: new FormControl(this.data?.folderId ?? 0)
    });
  }

  private materialLinkValidator(materialType: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.toLowerCase() || '';
      if (!value) return null;

      switch (materialType) {
        case 'pdf':
          return value.endsWith('.pdf') ? null : { invalidPdf: true };
        case 'video':
          return value.includes('youtube.com') || value.includes('youtu.be')
            ? null
            : { invalidVideo: true };
        case 'audio':
          return value.endsWith('.mp3') || value.endsWith('.wav') || value.endsWith('.ogg')
            ? null
            : { invalidAudio: true };
        default:
          return null;
      }
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveMaterial(): void {
    if (this.materialsForm.valid) {
      const formValue = this.materialsForm.value;
      const material: newMaterial = {
        title: formValue.title,
        material_link: formValue.material_link,
        folder_id: formValue.folder_id
      };
      this.dialogRef.close(material);
    } else {
      this.materialsForm.markAllAsTouched();
    }
  }
}