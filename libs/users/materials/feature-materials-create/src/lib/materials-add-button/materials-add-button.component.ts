import { ChangeDetectionStrategy, Component, DestroyRef, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMaterialDTO, MaterialsFacade } from '@users/materials/data-access';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { filter, tap } from 'rxjs';
import { MaterialType, regexMaterials } from 'libs/users/materials/feature-materials-list/src/lib/materials-list/materials-list-view-model';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [CommonModule, 
    MatIconModule, 
    MatButtonModule, 
    MatTooltipModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatMenuModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
    private title!: string;
    public dialog = inject(MatDialog);
    private readonly materialsFacade = inject(MaterialsFacade);
    private readonly destroyRef = inject(DestroyRef);
    public materialType = MaterialType;
    public readonly regexMaterials = regexMaterials;

    openAddMaterialDialog(type: MaterialType): void {
      const dialogRef: MatDialogRef<MaterialsAddDialogComponent> = 
      this.dialog.open(MaterialsAddDialogComponent, {
        data: { type },
      });
        dialogRef
        .afterClosed()
        .pipe(
          filter(Boolean),
          tap((result: CreateMaterialDTO) => {
            const newMaterial: CreateMaterialDTO = {
              title: result.title,
              material_link: result.material_link,
            };
            this.materialsFacade.addMaterial(newMaterial);
          })
        )
        .subscribe()
    }
}
