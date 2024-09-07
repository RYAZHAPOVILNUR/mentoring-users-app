import { Injectable, inject } from '@angular/core';
import { MaterialFacade } from '@users/materials/data-access';
import { FormField } from '../../../../../shared/components/form/form.component';
import { TranslateService } from '@ngx-translate/core';
import { Folder } from 'libs/users/materials/data-access/src/lib/models/folder.interface';
import { CreateFolderInput } from 'libs/users/materials/data-access/src/lib/models/create-folder-input.type';
import { Validators } from '@angular/forms';

interface FolderFormValue {
  title: string | null;
}

@Injectable()
export class CreateFolderFormService {
  private readonly materialFacade = inject(MaterialFacade);
  private readonly translateService = inject(TranslateService);

  private readonly translationKeyPrefix = 'MATERIALS.FOLDER-CREATE-DIALOG.';

  public createFolder(values: FolderFormValue) {
    const folderDTO = this.buildFolderDTO(values);
    this.materialFacade.createFolder(folderDTO);
  }

  public getFormFields(folder?: Folder): FormField[] {
    return [
      {
        key: 'title',
        value: folder?.title,
        label: this.translateService.instant(
          this.translationKeyPrefix + 'FORM.FIELDS.TITLE.LABEL'
        ),
        placeholder: this.translateService.instant(
          this.translationKeyPrefix + 'FORM.FIELDS.TITLE.PLACEHOLDER'
        ),
        validators: Validators.required,
      },
    ];
  }

  private buildFolderDTO(values: FolderFormValue): CreateFolderInput {
    return {
      title: values.title ?? '',
    };
  }
}
