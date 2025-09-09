import { inject, Injectable } from '@angular/core';
import { ConfirmDialog, ConfirmDialogService } from '@shared/ui-confirm-dialog';
import { Folder } from '@users/data-access-folder';

@Injectable({ providedIn: 'root' })
export class ConfirmFolderDialogService {
  private readonly confirmDialogService = inject(ConfirmDialogService);

  openDeleteFolderConfirmDialog(folder: Folder): ConfirmDialog {
    return this.confirmDialogService.open({
      title: 'Удаление папки',
      content: `Вы уверены, что хотите удалить пользователя "${folder.title}"?`,
      primaryButtonText: 'Удалить',
      primaryButtonAppearance: 'warn',
    });
  }
}
