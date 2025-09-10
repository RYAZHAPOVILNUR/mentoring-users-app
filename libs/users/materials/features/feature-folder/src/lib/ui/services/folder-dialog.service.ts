import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { CreateFolderDialogComponent } from '../dialogs/create-folder-dialog/create-folder-dialog.component';
import { CreateDialogData } from '../types/create-dialog-data.type';

@Injectable({ providedIn: 'root' })
export class FolderDialogService {
  private readonly dialog = inject(MatDialog);

  open(): MatDialogRef<CreateFolderDialogComponent, CreateDialogData> {
    return this.dialog.open<CreateFolderDialogComponent, CreateDialogData>(CreateFolderDialogComponent, {});
  }
}
