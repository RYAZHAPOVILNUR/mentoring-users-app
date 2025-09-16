import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ConfirmDialogComponent, ConfirmDialogService } from '@shared/ui-confirm-dialog';
import { CreateMaterialData, DeleteMaterialData, ViewMaterialData } from '@users/data-access-material';
import { MaterialContentDialogComponent } from '@users/feature-material-content-dialog';

import { CreateMaterialDialogComponent } from '../create-material-dialog/create-material-dialog.component';
import { CreateMaterialCloseData } from '../types/create-material-close-data.type';

@Injectable({ providedIn: 'root' })
export class MaterialDialogService {
  private readonly dialog = inject(MatDialog);
  private readonly confirmDialogService = inject(ConfirmDialogService);

  public openAddDialog(data: CreateMaterialData): MatDialogRef<CreateMaterialDialogComponent, CreateMaterialCloseData> {
    return this.dialog.open<CreateMaterialDialogComponent, CreateMaterialData, CreateMaterialCloseData>(
      CreateMaterialDialogComponent,
      { data },
    );
  }

  public openViewDialog(data: ViewMaterialData): MatDialogRef<MaterialContentDialogComponent> {
    return this.dialog.open<MaterialContentDialogComponent, ViewMaterialData>(MaterialContentDialogComponent, { data });
  }

  openDelete(data: DeleteMaterialData): MatDialogRef<ConfirmDialogComponent, true> {
    return this.confirmDialogService.open({
      title: 'Удаление материала',
      content: `Вы уверены, что хотите удалить файл "${data.title}"?`,
      primaryButtonText: 'Удалить',
      primaryButtonAppearance: 'warn',
    });
  }
}
