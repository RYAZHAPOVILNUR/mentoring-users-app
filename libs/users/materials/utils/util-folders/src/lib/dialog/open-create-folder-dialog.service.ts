import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { CreateFolder } from '@users/ui-folders';

import { CreateFolderDialogComponent } from './create-folder-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class OpenCreateFolderDialogService {
  private readonly dialog = inject(MatDialog);

  open(): MatDialogRef<CreateFolderDialogComponent, CreateFolder> {
    return this.dialog.open<CreateFolderDialogComponent, void, CreateFolder>(CreateFolderDialogComponent);
  }
}
