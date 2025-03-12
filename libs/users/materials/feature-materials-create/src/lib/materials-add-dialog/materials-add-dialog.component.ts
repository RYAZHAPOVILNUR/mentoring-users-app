import { ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MaterialType, regexMaterials } from 'libs/users/materials/feature-materials-list/src/lib/materials-list/materials-list-view-model';

// export enum MaterialType {
//   PDF  = 'pdf',
//   AUDIO = 'audio',
//   VIDEO = 'video',
// }

// export const regexMaterials = {
//   pdf: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.pdf(?:\?[^\s]*)?$/i,  // Учитываем параметры в URL
//   audio: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(mp3|aac|ogg|wav)$/i,  // Поддержка нескольких расширений
//   video: /(?:youtu\.be\/|youtube\.com\/(?:[^\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/?|.*[?&]v=))([a-zA-Z0-9_-]{11})/i,  // Улучшенное регулярное выражение для YouTube
// }

function materialLinkValidator(data: MaterialType): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const trimmedValue = control.value?.trim().replace(/\s+/g, ' ');
    switch (data) {
      case MaterialType.PDF:
        if (regexMaterials.pdf.test(trimmedValue)) return null; // Если соответствует regex для PDF
        break;
      case MaterialType.AUDIO:
        if (regexMaterials.audio.test(trimmedValue)) return null; // Если соответствует regex для AUDIO
        break;
      case MaterialType.VIDEO:
        if (regexMaterials.video.test(trimmedValue)) return null; // Если соответствует regex для VIDEO
        break;
    }
    return { error: 'Invalid link' };
  };
}

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent implements OnInit{
    public formGroup!: FormGroup;
    private formBuilder = inject(FormBuilder);
    public dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>);
    public readonly regexMaterials = regexMaterials;
    public readonly data = inject(MAT_DIALOG_DATA);
    private sanitizer = inject(DomSanitizer);

    ngOnInit() {
      this.formGroup = this.formBuilder.group({
        title: ['', Validators.required],
        material_link: [
          '', 
          [
            Validators.required,
            materialLinkValidator(this.data.type)
          ]
        ],
      });
    }

    cancel(): void {
      this.dialogRef.close();
    }
    
    save(): void {
      if (this.formGroup.valid) {
        const formData = {
          title: this.formGroup.value.title,
          material_link: this.formGroup.value.material_link.trim()
        }
        this.dialogRef.close(formData)
      } 
    }
    
    getSanitizedUrl(url: string): SafeUrl {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

}
