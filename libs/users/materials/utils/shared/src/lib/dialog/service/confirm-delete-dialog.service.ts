import { inject, Injectable } from '@angular/core';

import { ConfirmDialogService } from '@shared/ui-confirm-dialog';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDeleteDialogService {
  private confirmDialogService = inject(ConfirmDialogService);
  openDeleteFolderDialog(title: string) {
    return this.confirmDialogService.open({
      title: 'Подтверждение удаления',
      content: `Вы уверены, что хотите удалить "${title}"?`,
      secondaryButtonAppearance: 'warn',
    });
  }
}
