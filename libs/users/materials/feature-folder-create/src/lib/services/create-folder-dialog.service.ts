import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { FolderCreateEditDialogComponent } from '../components/folder-create-dialog/folder-create-dialog.component';
import { Observable } from 'rxjs';

@Injectable()
export class CreateFolderDialogService {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  public showFolderCreateDialog(): Observable<void> {
    return this.dialog
      .open(FolderCreateEditDialogComponent)
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef));
  }
}
