import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreateMaterialWithoutFolderId } from '@users/materials-data-access';
import { MATERIAL_TYPES } from '../../../../constants/material-types.constants';

@Component({
  selector: 'users-add-material-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './add-material-dialog.component.html',
  styleUrls: ['./add-material-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMaterialDialogComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _dialogRef = inject(MatDialogRef<AddMaterialDialogComponent>);
  public readonly materialType = inject(MAT_DIALOG_DATA);

  public formGroup = this._fb.group({
    title: ['', Validators.required],
    link: ['', [Validators.required, this.formValidator(this.materialType)]],
  });

  public save() {
    if (this.formGroup.valid && this.formGroup.value.title && this.formGroup.value.link) {
      const data: CreateMaterialWithoutFolderId = {
        title: this.formGroup.value.title.trim(),
        material_link: this.formGroup.value.link.trim(),
      };
      this._dialogRef.close(data);
    }
  }

  public formValidator(materialType: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const typeInfo = Object.values(MATERIAL_TYPES).find((type) => type.label === materialType);
      if (!/^https?:\/\//i.test(control.value)) {
        return { invalidUrl: true };
      }
      if (typeInfo && !typeInfo.validationRegex.test(control.value)) {
        return { invalidMaterialLink: true };
      }
      return null;
    };
  }

  public getLinkErrorMessage(): string {
    const linkControl = this.formGroup.get('link');
    if (linkControl?.hasError('required')) {
      return 'Ссылка обязательна';
    }
    if (linkControl?.hasError('invalidUrl')) {
      return 'Адрес должен начинаться с http или https';
    }
    if (linkControl?.hasError('invalidMaterialLink')) {
      return 'Ссылка не соответствует формату ожидаемого типа материала';
    }
    return '';
  }
}
