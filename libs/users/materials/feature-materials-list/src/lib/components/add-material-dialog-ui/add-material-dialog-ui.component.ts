import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ErrorsKey, MaterialForm, MaterialFormGroupService } from '@users/materials/data-access';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { VALIDATION_ERRORS } from '../../../../../../../core/config/src/lib/tokens/errors-validation.token';

function validationErrorsFactory(translateService: TranslateService): { [key in ErrorsKey]: string } {
  return {
    required: translateService.instant('MATERIALS.VALIDATION_REQUIRED'),
    minlength: translateService.instant('MATERIALS.VALIDATION_MIN_LENGTH'),
    pattern: translateService.instant('MATERIALS.VALIDATION_PATTERN')
  };
}

type AddMaterialDialogRef = MatDialogRef<AddMaterialDialogUiComponent, MaterialForm>;

@Component({
  standalone: true,
  imports: [
    NgIf,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    TranslateModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './add-material-dialog-ui.component.html',
  styleUrls: ['./add-material-dialog-ui.component.scss'],
  providers: [
    MaterialFormGroupService,
    {
      provide: VALIDATION_ERRORS,
      useFactory: validationErrorsFactory,
      deps: [TranslateService]
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddMaterialDialogUiComponent {
  private readonly validationErrors = inject(VALIDATION_ERRORS);
  private readonly dialogRef: AddMaterialDialogRef = inject(MatDialogRef);
  readonly materialFormGroup = inject(MaterialFormGroupService).getMaterialFormGroup();

  onDoneButtonClick(): void {
    const { title, materialLink } = this.materialFormGroup.getRawValue();
    this.dialogRef.close({
      title,
      materialLink
    });
  }

  getErrorMessage(fieldName: keyof MaterialForm): string { // todo бизнес логика должна содержаться в сервисах
    const field = this.materialFormGroup.get(fieldName)!;

    if (field.hasError(ErrorsKey.MIN_LENGTH))
      return this.getMinLengthError(field);

    const key = Object.values(ErrorsKey).find(
      (key) => field.hasError(key)
    );
    if (!key) return '';

    return this.validationErrors[key] ?? '';
  }

  private getMinLengthError(field: AbstractControl): string {
    if (!field.errors) return '';
    const { actualLength, requiredLength } = field.errors[ErrorsKey.MIN_LENGTH];

    return this.validationErrors[ErrorsKey.MIN_LENGTH] +
      `, сейчас: ${actualLength} символов, нужно: ${requiredLength}`;
  }
}