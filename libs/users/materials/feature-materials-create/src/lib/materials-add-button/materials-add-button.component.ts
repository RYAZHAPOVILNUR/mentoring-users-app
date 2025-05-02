import { ChangeDetectionStrategy, Component, DestroyRef, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateMaterialDTO, MaterialsFacade } from '@users/materials/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';

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

  async onAddMaterial(materialFormat: string): Promise<void> {
    const folderId = await firstValueFrom(this.materialsFacade.folderId$);
    const dialogRef: MatDialogRef<MaterialsAddDialogComponent> = this.dialog.open(MaterialsAddDialogComponent, {
      data: {
        materialFormat: materialFormat,
        materialTitle: this.materialTitle,
        materialLink: this.materialLink,
        folder_id: folderId 
      }
    });
  
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          const newMaterial: CreateMaterialDTO = {
            title: result.materialTitle,
            material_link: result.materialLink,
            material_format: result.materialFormat,
            folder_id: result.folderId,
          };
          this.materialsFacade.addMaterial(newMaterial);
        }
      });
  }
  
}


