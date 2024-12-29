import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialsFacade } from '@users/materials/data-access';
import { MaterialFileType } from 'libs/users/materials/data-access/src/lib/constants-enums/materials-enums';
import { AddMaterialsType } from 'libs/users/materials/data-access/src/lib/models/material.type';
import { Subscription } from 'rxjs';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatMenuModule, MatDialogModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly MaterialsFacade = inject(MaterialsFacade);
  public readonly MaterialFileType = MaterialFileType;

  private subscription: Subscription = new Subscription(); 

  public openDialog(data: MaterialFileType) {
    const dialogRef = this.dialog.open(MaterialsAddDialogComponent, {
      width: '400px',
      height: '310px',
      data,
    });
    const dialogSubscription = dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          const newMaterial: AddMaterialsType = {
            title: result.title,
            material_link: result.link,
          };
          this.MaterialsFacade.addMaterial(newMaterial);
        }
      });

    this.subscription.add(dialogSubscription);
  }
}