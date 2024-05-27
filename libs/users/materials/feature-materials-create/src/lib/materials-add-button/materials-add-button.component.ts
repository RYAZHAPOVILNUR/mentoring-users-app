import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaterialFacade } from '@users/materials/data-access';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatMenuModule,
  ],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
})
export class MaterialsAddButtonComponent {
  public dialog = inject(MatDialog)
  private title!: string;
  private link!: string;
  private readonly destroyRef = inject(DestroyRef);
  private readonly facade = inject(MaterialFacade);
  public readonly materialsTypes: string[] = ['Video', 'Audio', 'PDF'];
  private readonly activateRoute = inject(ActivatedRoute)

  openAddMaterialDialog(type: string): void {
    const dialogRef = this.dialog.open(
      MaterialsAddDialogComponent, {
      data: {
        title: this.title,
        material_link: this.link,
        type: type
      },
    });

    dialogRef.afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (result => {
          if (result) {
            const folder_id = this.activateRoute.snapshot.params['id']
            result = { ...result, folder_id }
            this.facade.addMaterial(result)
          }
        })
      )
  }
}
