import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddMaterialsType, MaterialsFacade } from '@users/materials/data-access';
import { DestroyRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule,  MatIconModule, MatMenuModule, MatTooltipModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {

  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly destroyRef = inject(DestroyRef);
  public dialog = inject(MatDialog);

  private materialTitle!: string;
  private materialLink!: string;

   onAddMaterial(materialType: string): void {
    const dialogRef: MatDialogRef<MaterialsAddDialogComponent> = this.dialog
      .open(MaterialsAddDialogComponent, { data: {
        materialType: materialType,
        materialTitle: this.materialTitle, 
        materialLink: this.materialLink
      } });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if(result) {
          const newMaterial: AddMaterialsType = {
            title: result.materialTitle,
            material_link: result.materialLink
          }

          this.materialsFacade.addMaterial(newMaterial)
        }
      })
  }
}
