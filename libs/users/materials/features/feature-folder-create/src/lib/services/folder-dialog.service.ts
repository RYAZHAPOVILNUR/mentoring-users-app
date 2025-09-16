import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ConfirmDialogComponent, ConfirmDialogService } from '@shared/ui-confirm-dialog';
import { DeleteFolderData } from '@users/data-access-folder';

import { CreateFolderDialogComponent } from '../create-folder-dialog/create-folder-dialog.component';
import { CreateFolderCloseData } from '../types/create-folder-close-data.type';

@Injectable({ providedIn: 'root' })
export class FolderDialogService {
  private readonly dialog = inject(MatDialog);
  private readonly confirmDialogService = inject(ConfirmDialogService);

  openAddFolder(): MatDialogRef<CreateFolderDialogComponent, CreateFolderCloseData> {
    return this.dialog.open<CreateFolderDialogComponent, CreateFolderCloseData>(CreateFolderDialogComponent, {});
  }

  openDelete(folder: DeleteFolderData): MatDialogRef<ConfirmDialogComponent, true> {
    return this.confirmDialogService.open({
      title: 'Удаление папки',
      content: `Вы уверены, что хотите удалить папку "${folder.title}"?`,
      primaryButtonText: 'Удалить',
      primaryButtonAppearance: 'warn',
    });
  }
}
