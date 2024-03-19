import { ChangeDetectionStrategy, Component, DestroyRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaterialsFacade } from '@users/materials/data-access';
import { IAddMaterial } from 'libs/users/materials/data-access/src/lib/model/folders-models';
import { MaterialAddDialogComponent } from '../material-add-dialog/material-add-dialog.component';

@Component({
  selector: 'users-feature-materials-add-btn',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatMenuModule,
  ],
  templateUrl: './feature-materials-add-btn.component.html',
  styleUrls: ['./feature-materials-add-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureMaterialsAddBtnComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly destroyRef = inject(DestroyRef);
  public dialog = inject(MatDialog);

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  public onOpenMenu(event: Event) {
    event.stopPropagation();
    this.trigger.openMenu();
  }

  onAddMaterial(materialType: string): void {
    const dialogRef: MatDialogRef<MaterialAddDialogComponent> = this.dialog
      .open(MaterialAddDialogComponent, { data: {
        materialType: materialType,
      } });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if(result) {
          const newMaterial: IAddMaterial = {
            title: result.materialTitle,
            material_link: result.materialLink

          }

          this.materialsFacade.addNewMaterial(newMaterial)
        }
      })
  }


}
