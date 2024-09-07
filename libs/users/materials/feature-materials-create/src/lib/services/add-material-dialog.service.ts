import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MaterialAddDialogComponent } from '../components/materials-add-dialog/materials-add-dialog.component';
import { MaterialType } from '../enums/material-type.enum';

export interface AddMaterialDialogData {
  type: MaterialType;
  parentFolderId: number | null;
}

@Injectable()
export class AddMaterialDialogService {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  public showAddMaterialDialog(data: AddMaterialDialogData): Observable<void> {
    return this.dialog
      .open(MaterialAddDialogComponent, { data })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef));
  }
}
