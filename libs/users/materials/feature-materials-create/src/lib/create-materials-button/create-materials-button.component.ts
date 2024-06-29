import { ChangeDetectionStrategy, Component, DestroyRef, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { CreateMaterialsDialogComponent } from '../create-materials-dialog/create-materials-dialog.component';
import { Folder, MaterialType, MaterialsFacade } from '@users/users/materials/data-access';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateMaterialsDialogRef } from '../types/create-materials-dialog-ref';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'users-create-materials-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    TranslateModule,
    MatTooltipModule,
  ],
  templateUrl: './create-materials-button.component.html',
  styleUrls: ['./create-materials-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMaterialsButtonComponent {
  @Input({required: true})
  folder!: Folder;

  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly materialsFacade = inject(MaterialsFacade);
  public readonly MaterialType = MaterialType;

  public openAddMaterialDialog(materialType: MaterialType): void {
    const dialogRef: CreateMaterialsDialogRef = this.dialog.open(
      CreateMaterialsDialogComponent, {
      data: {
        materialType,
        folderId: this.folder.id,
      }
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((materialData) => {
        if(materialData) {
          this.materialsFacade.addMaterial(materialData);
        }
      })
  }
}
