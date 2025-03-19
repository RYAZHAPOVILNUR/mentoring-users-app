import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IAddMaterial, materialsFacade } from '@users/materials/data-access';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { MaterialFileType } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatMenuModule, MatDialogModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent implements OnDestroy {
  private readonly dialog = inject(MatDialog);
  private readonly materialsFacade = inject(materialsFacade);
  private readonly unsubscribe$ = new Subject<void>();
  public readonly MaterialFileType = MaterialFileType;

  public openAddDialog(data: MaterialFileType) {
    const dialogRef = this.dialog.open(MaterialsAddDialogComponent, {
      height: '300px',
      width: '500px',
      data,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result) {
          const newMaterial: IAddMaterial = {
            title: result.title,
            material_link: result.link,
          };
          this.materialsFacade.addMaterials(newMaterial);
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
