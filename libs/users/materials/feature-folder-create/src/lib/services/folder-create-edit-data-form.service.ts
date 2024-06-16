import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MaterialFacade } from '@users/materials/data-access';
import { Folder } from 'libs/users/materials/data-access/src/lib/models/folder.interface';

export interface FormField {
  key: string;
  value: unknown;
  placeholder?: string;
  label?: string;
}

@Injectable()
export class FolderCreateEditDataFormService {
  private readonly translateService = inject(TranslateService);
  private readonly materialFacade = inject(MaterialFacade);
  private readonly translationKeyPrefix = 'MATERIALS.FOLDER.FORM.FORM-FIELDS.';

  public getMainFields(folder?: Folder): FormField[] {
    return [
      {
        key: 'id',
        value: folder?.id,
      },
      {
        key: 'title',
        label: this.translateService.instant(
          this.translationKeyPrefix + 'NAME.LABEL'
        ),
        placeholder: this.translateService.instant(
          this.translationKeyPrefix + 'NAME.PLACEHOLDER'
        ),
        value: folder?.title,
      },
    ];
  }

  public createFolder(formValues: any) {
    this.materialFacade.createFolder({ title: formValues.title });
  }
}
