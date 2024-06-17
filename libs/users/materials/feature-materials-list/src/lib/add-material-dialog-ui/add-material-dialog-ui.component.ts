import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ErrorsKey, ERRORSS, MaterialDTO, MaterialFormGroup, MaterialsFacade } from '@users/materials/data-access';
import { ReactiveFormsModule } from '@angular/forms';

function validationErrorsFactory(translateService: TranslateService): { [key in ErrorsKey]: string } {
  return {
    required: translateService.instant('MATERIALS.VALIDATION_REQUIRED'),
    minlength: translateService.instant('MATERIALS.VALIDATION_MIN_LENGTH'),
    pattern: translateService.instant('MATERIALS.VALIDATION_PATTERN')
  };
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
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
    MaterialFormGroup,
    {
      provide: ERRORSS,
      useFactory: validationErrorsFactory,
      deps: [TranslateService]
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddMaterialDialogUiComponent {
  readonly facade = inject(MaterialsFacade);
  readonly dialogRef: MatDialogRef<AddMaterialDialogUiComponent, Partial<MaterialDTO>> = inject(MatDialogRef);
  readonly materialFormGroupService = inject(MaterialFormGroup);
  readonly materialFormGroup = this.materialFormGroupService.getMaterialFormGroup();

  onDoneButtonClick(): void {
    const title = this.materialFormGroup.controls.materialTitle.value;
    const material_link = this.materialFormGroup.controls.materialLink.value; // todo JS ПЕРЕМЕННЫЕ НЕ МОГУТ ИДТИ ЧЕРЕЗ ПОДЧЕРКИВАНИЕ БЛЯДЬ
    this.dialogRef.close({ title, material_link });
  }
}