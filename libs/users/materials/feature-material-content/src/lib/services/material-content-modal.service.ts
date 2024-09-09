import { DestroyRef, inject, Injectable } from '@angular/core';
import { Material } from '../../../../data-access/src/lib/models/material.interface';
import { MatDialog } from '@angular/material/dialog';
import { MaterialContentModalComponent } from '../components/material-content-modal/material-content-modal.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaterialType } from 'libs/users/materials/feature-materials-create/src/lib/enums/material-type.enum';

export interface MaterialContentModalData {
  material: Material;
  type: MaterialType;
}

@Injectable()
export class MaterialContentModalService {
  private readonly dialog = inject(MatDialog);
  private readonly destrouRef = inject(DestroyRef);

  public showMaterialContentModal(data: MaterialContentModalData) {
    return this.dialog
      .open(MaterialContentModalComponent, { data })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destrouRef));
  }
}
