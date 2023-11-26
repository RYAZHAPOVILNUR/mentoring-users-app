import { ChangeDetectionStrategy, Component, inject, DestroyRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IAddMaterial, MaterialsFacade } from '@users/materials/data-access';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'users-materials-add-button',
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
    MatMenuModule
  ],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly destroyRef = inject(DestroyRef);
  public dialog = inject(MatDialog);
  
  private materialTitle!: string;
  private materialLink!: string;

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  public onOpenMenu(event: Event) {
    event.stopPropagation();
    this.trigger.openMenu();
  }
  
  onAddMaterial(materialType: string): void {
    const dialogRef: MatDialogRef<MaterialsAddDialogComponent> = this.dialog
      .open(MaterialsAddDialogComponent, { data: {
        materialType: materialType,
        materialTitle: this.materialTitle, materialLink: this.materialLink
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

          this.materialsFacade.addMaterial(newMaterial)
        }
      })
  }
}
