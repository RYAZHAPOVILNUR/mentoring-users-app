import { inject, Injectable } from '@angular/core';
import { ConfirmDialog, ConfirmDialogService } from '@shared/ui-confirm-dialog';
import { Material } from '@users/data-access-material';

@Injectable({ providedIn: 'root' })
export class ConfirmMaterialDialogService {
  private readonly confirmDialogService = inject(ConfirmDialogService);

  openDeleteMaterialConfirmDialog(material: Material): ConfirmDialog {
    return this.confirmDialogService.open({
      title: 'Удаление материала',
      content: `Вы уверены, что хотите удалить материал "${material.title}"?`,
      primaryButtonText: 'Удалить',
      primaryButtonAppearance: 'warn',
    });
  }
}
