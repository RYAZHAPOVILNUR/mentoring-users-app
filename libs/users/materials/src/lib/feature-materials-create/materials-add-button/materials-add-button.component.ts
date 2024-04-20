import { Component, DestroyRef, TemplateRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsFacade } from '@users/materials/data-access';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { IAddMaterial } from '../../../../data-access/src/lib/models/add-material.model';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatIconModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
})
export class MaterialsAddButtonComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly destroyRef = inject(DestroyRef);
  public dialog = inject(MatDialog);

  public snackbar = inject(MatSnackBar);
  private materialTitle!: string;
  private materialLink!: string;

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  @ViewChild('snackbar') snackbarTemplateRef!: TemplateRef<any>;

  public onOpenMenu(event: Event) {
    event.stopPropagation();
    this.trigger.openMenu();
  }
  private onAddMaterialSnackBar = () =>
    this.snackbar.openFromTemplate(this.snackbarTemplateRef, {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  onAddMaterial(materialType: string): void {
    const dialogRef: MatDialogRef<MaterialsAddDialogComponent> = this.dialog.open(MaterialsAddDialogComponent, {
      data: {
        materialType: materialType,
        materialTitle: this.materialTitle,
        materialLink: this.materialLink,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          const newMaterial: IAddMaterial = {
            title: result.materialTitle,
            material_link: result.materialLink,
          };

          this.materialsFacade.addMaterials(newMaterial);
          this.onAddMaterialSnackBar();
        }
      });
  }
}
