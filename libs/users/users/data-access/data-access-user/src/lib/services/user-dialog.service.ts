import { inject, Injectable } from '@angular/core';

import { ConfirmDialog, ConfirmDialogService } from '@shared/ui-confirm-dialog';
import { UserVM } from '@users/shared/data-access-models';

@Injectable()
export class UserDialogService {
  private readonly confirmDialogService = inject(ConfirmDialogService);

  openDeleteUserConfirmDialog(user: UserVM): ConfirmDialog {
    return this.confirmDialogService.open({
      title: 'Удаление пользователя',
      content: `Вы уверены, что хотите удалить пользователя "${user.name}"?`,
      primaryButtonText: 'Удалить',
      primaryButtonAppearance: 'warn',
    });
  }
}
