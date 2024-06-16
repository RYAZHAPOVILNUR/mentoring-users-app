import { ComponentType } from '@angular/cdk/portal';
import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class FolderCreateEditDialogService {
  private readonly dialog = inject(MatDialog);

  public open<T, D>(component: ComponentType<T>, data?: D) {
    this.dialog.open<T>(component, { data });
  }
}
