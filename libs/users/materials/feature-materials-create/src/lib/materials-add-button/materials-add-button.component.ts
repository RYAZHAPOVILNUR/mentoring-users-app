import { Component, DestroyRef, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MaterialsFacade, MaterialType } from '@users/materials/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

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
  private title!: MaterialType;

  public openDialog(type: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.restoreFocus = false;
    dialogConfig.data = { title: this.title };

    const dialogRef = this.dialog.open(MaterialsAddDialogComponent, dialogConfig);
    dialogRef.componentInstance.type = type;

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        this.menuTrigger?.focus();
        if (result) {
          this.materialsFacade.addMaterial(result);
        }
      });
  }
}
