import { ChangeDetectionStrategy, Component, DestroyRef, TemplateRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { MaterialsFacade } from '@users/materials/data-access';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'materials-add-button',
  standalone: true,
  imports: [CommonModule, MaterialsAddDialogComponent, MatIconModule, MatButtonModule, MatDialogModule, MatMenuModule,],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
  public dialog = inject(MatDialog)
  private readonly destroyRef = inject(DestroyRef);
  private readonly materialsFacade = inject(MaterialsFacade)
  // private snackBar = inject(MatSnackBar); Если эта штука есть, но нигде не используется, то выдает ошибку

  @ViewChild('snackbarAddMaterialSuccess') snackbarTemplateRef!: TemplateRef<any>;

  constructor() {
    console.log('add button run');
  }

  // private showSnackbarAddMaterialSuccess = () =>
  //   this.snackBar.openFromTemplate(this.snackbarTemplateRef, {
  //     duration: 2500,
  //     horizontalPosition: 'center',
  //     verticalPosition: 'top',
  //   });

  openAddMaterialDialog(materialType: string){
    const dialogRef: MatDialogRef<MaterialsAddDialogComponent> = this.dialog.open(
      MaterialsAddDialogComponent, {
        data: {materialType}
      }
    );
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if(result) {
          console.log('result after colse dialog in add button comp', result);
          const material = {
            title: result.title,
            material_link: result.link
          }
          this.materialsFacade.addMaterial(material)
        }
      })
  }
}
