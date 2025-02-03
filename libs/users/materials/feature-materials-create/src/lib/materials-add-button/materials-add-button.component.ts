import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MaterialsFacade } from '@users/materials/data-access';
import { IAddMaterial } from 'libs/users/materials/data-access/src/lib/models/materials-add.model';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatMenuModule, MatTooltipModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly materialsFacade = inject(MaterialsFacade);

  @Input({ required: true })
  folderId: number | undefined;

  public openAddMaterialDialog(type: string): void {
    const dialogRef: MatDialogRef<MaterialsAddDialogComponent> = this.dialog.open(MaterialsAddDialogComponent, {
      data: { type: type },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: IAddMaterial) => {
        if (result) {
          const newMaterial: IAddMaterial = {
            title: result.title,
            material_link: result.material_link,
            folder_id: this.folderId,
          };
          this.materialsFacade.addMaterial(newMaterial);
        }
      });
  }
}
