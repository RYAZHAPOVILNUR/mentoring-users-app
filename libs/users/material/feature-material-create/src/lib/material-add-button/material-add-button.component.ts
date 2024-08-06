import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialAddDialogComponent } from '../material-add-dialog/material-add-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateMaterial, MaterialFacade } from '@users/material';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { withLatestFrom } from 'rxjs';

@Component({
  selector: 'users-material-add-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatButtonModule],
  templateUrl: './material-add-button.component.html',
  styleUrls: ['./material-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialAddButtonComponent {
  private title!: string;
  private link!: string;
  public dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);
  private materialFacade = inject(MaterialFacade);

  openAddMaterialDialog(typeOfMaterial: string): void {
    const dialogRef: MatDialogRef<MaterialAddDialogComponent> = this.dialog.open(MaterialAddDialogComponent, {
      data: {
        title: this.title,
        link: this.link,
        typeOfMaterial: typeOfMaterial,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef), withLatestFrom(this.materialFacade.routeParams$))
      .subscribe(([material, params]) => {
        if (material) {
          const newMaterial: CreateMaterial = {
            title: material.title,
            material_link: material.link,
            folder_id: Number(params['id']),
          };

          this.materialFacade.createMaterial(newMaterial);
        }
      });
  }
}
