import { Component, DestroyRef, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MaterialsFacade, MaterialType } from '@users/materials/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MaterialAdd } from '../../../../data-access/src/lib/models/material-add.model';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class MaterialsAddButtonComponent {
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;
  protected readonly MaterialType = MaterialType;
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly materialsFacade = inject(MaterialsFacade);

  public openDialog(type: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus = false;
    dialogConfig.data = { type };

    const dialogRef = this.dialog.open(MaterialsAddDialogComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        this.menuTrigger?.focus();
        if (result) {
          const newMaterial: MaterialAdd = {
            title: result.title,
            material_link: result.url,
          };
          this.materialsFacade.addMaterial(newMaterial);
        }
      });
  }
}
