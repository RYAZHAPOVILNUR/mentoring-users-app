import { ChangeDetectionStrategy, Component, DestroyRef, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Material, MaterialCreate, MaterialsFacade } from '../../data-access/src';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
  readonly dialog = inject(MatDialog);
  private activateRouter = inject(ActivatedRoute);
  materialsFacade = inject(MaterialsFacade);
  destroyRef = inject(DestroyRef);
  folderId!: number;

  addMaterialCreate(materialType: string) {
    this.folderId = +this.activateRouter.snapshot.paramMap.get('id')!
    const dialogRef: MatDialogRef<MaterialsAddDialogComponent> =
      this.dialog.open(MaterialsAddDialogComponent, {data: {folderId: this.folderId, materialType: materialType}});
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        if (res) {
          this.materialsFacade.addMaterials(res);
        }
      });
  }
}
