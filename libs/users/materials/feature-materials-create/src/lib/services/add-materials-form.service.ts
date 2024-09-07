import { inject, Injectable, Type } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormField } from '../../../../../shared/components/form/form.component';
import { Material } from 'libs/users/materials/data-access/src/lib/models/material.interface';
import { CreateMaterialInput } from '../../../../data-access/src/lib/models/create-material-input.interface';
import { MaterialFacade } from '@users/materials/data-access';
import { Validators } from '@angular/forms';
import { MaterialValidationService } from './material-validation.service';
import { MaterialType } from '../enums/material-type.enum';

export interface AddMaterialFormValue {
  title: string;
  materialLink: string;
  folderId: number;
}

@Injectable()
export class AddMaterialFormService {
  private readonly translateService = inject(TranslateService);
  private readonly materialFacade = inject(MaterialFacade);
  protected readonly materialValidationService = inject(
    MaterialValidationService
  );
  private readonly translationKeyPrefix =
    'MATERIALS.MATERIAL.MATERIAL-CREATE-DIALOG.FORM.FIELDS.';

  public getFormFields(type: MaterialType, material?: Material): FormField[] {
    return [
      {
        key: 'title',
        label: this.translateService.instant(
          this.translationKeyPrefix + 'TITLE.LABEL'
        ),
        placeholder: this.translateService.instant(
          this.translationKeyPrefix + 'TITLE.PLACEHOLDER'
        ),
        value: material?.title,
        validators: Validators.required,
      },
      {
        key: 'materialLink',
        label: this.translateService.instant(
          this.translationKeyPrefix + 'MATERIAL-LINK.LABEL'
        ),
        placeholder: this.translateService.instant(
          this.translationKeyPrefix + 'MATERIAL-LINK.PLACEHOLDER'
        ),
        value: material?.material_link,
        validators: [
          Validators.required,
          Validators.pattern(
            this.materialValidationService.getRegExpByType(type)
          ),
        ],
      },
    ];
  }

  public createMaterial(formValue: AddMaterialFormValue) {
    const input = this.buildMaterialDto(formValue);
    this.materialFacade.createMaterial(input);
  }

  private buildMaterialDto(
    formValue: AddMaterialFormValue
  ): CreateMaterialInput {
    console.log(formValue);
    return {
      title: formValue.title,
      material_link: formValue.materialLink,
      folder_id: formValue.folderId,
    };
  }
}
