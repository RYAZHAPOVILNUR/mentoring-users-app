import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateMaterialDTO, MaterialFileType, MaterialsFacade } from '@users/materials/data-access';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { StickyButtonService } from '@users/core/ui';
import { MatButtonModule } from '@angular/material/button';
import { PushPipe } from '@ngrx/component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, PushPipe, MatIconModule, MatMenuModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsAddButtonComponent {
  private name: string[] = [];
  public isSticky$: Observable<boolean> = inject(StickyButtonService).isSticky$;
  public readonly dialog = inject(MatDialog);
  public readonly destroyRef = inject(DestroyRef);
  public readonly materialsFacade = inject(MaterialsFacade);
  public readonly fileType = MaterialFileType

  public openAddMaterialDialog(fileType: MaterialFileType): void {
    const dialogRef: MatDialogRef<MaterialsAddDialogComponent> = this.dialog.open(MaterialsAddDialogComponent, {
      width: '350px',
      data: { fileType }
    });

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (result) {
          const newMaterial: CreateMaterialDTO = {
            title: result.title,
            material_link: result.material_link,
            // folder_id: result.folderId,
            type: result.fileType
          };
          this.materialsFacade.addMaterial(newMaterial);
        }
      });
  }
}
