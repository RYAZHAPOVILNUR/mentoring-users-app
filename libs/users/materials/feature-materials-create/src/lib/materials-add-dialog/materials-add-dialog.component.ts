import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MaterialAdd, MaterialFormType, regexFileType } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef);
  public readonly data: string = inject(MAT_DIALOG_DATA);

  public readonly formGroup: FormGroup<MaterialFormType<MaterialAdd>> = this.fb.group({
    title: ['', Validators.required],
    material_link: ['', Validators.required],
  });

  public linkValidator(link: string) {
    switch (this.data) {
      case 'видео':
        return regexFileType.video.test(link);
      case 'PDF':
        return regexFileType.pdf.test(link);
      case 'подкаст':
        return regexFileType.audio.test(link);
      default:
        return true;
    }
  }

  public onAddMaterial(): void {
    if(this.formGroup.valid && this.linkValidator(this.formGroup.value.material_link!)) {
      this.dialogRef.close({ ...this.formGroup.value });
    }
  }
}
