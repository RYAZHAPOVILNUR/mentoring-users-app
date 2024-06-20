import { ChangeDetectionStrategy, Component, inject, InjectionToken } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ErrorsKey, MaterialForm, MaterialFormGroupService } from '@users/materials/data-access';
import { ReactiveFormsModule } from '@angular/forms';

// todo место полная хуйня:
const ERRORSS = new InjectionToken<{ [key in ErrorsKey]: string }>('errors');

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
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-material-dialog-ui.component.html',
  styleUrls: ['./add-material-dialog-ui.component.scss'],
  providers: [
    MaterialFormGroupService,
    {
      provide: ERRORSS,
      useFactory: validationErrorsFactory,
      deps: [TranslateService]
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddMaterialDialogUiComponent {
  private readonly validationErrors = inject(ERRORSS);
  private readonly dialogRef: AddMaterialDialogRef = inject(MatDialogRef);
  readonly materialFormGroup = inject(MaterialFormGroupService).getMaterialFormGroup();

  onDoneButtonClick(): void {
    const { title, materialLink } = this.materialFormGroup.getRawValue();
    this.dialogRef.close({
      title,
      materialLink
    });
  }

// todo БОЛЬШЕ это сколько? вывести пользователю нормальную инфу в виде "Введите минимум N символов, сейчас P"
  getErrorMessage(fieldName: keyof MaterialForm): string {
    const field = this.materialFormGroup.get(fieldName)!;
    const key = Object.values(ErrorsKey).find((key) => field.hasError(key));
    if (!key) return '';
    return this.validationErrors[key] ?? '';
  }
}