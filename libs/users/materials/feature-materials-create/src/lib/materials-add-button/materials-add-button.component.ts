import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsAddGialogComponent } from '../materials-add-gialog/materials-add-gialog.component';
import { take, tap } from 'rxjs';
import { MaterialAdd } from '@users/materials/data-access';
import { MaterialFacade } from '@users/materials/data-access'

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MaterialsAddGialogComponent,
  ],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
})
export class MaterialsAddButtonComponent {
  private readonly dialog = inject(MatDialog);
  private readonly MaterialsFacade = inject(MaterialFacade)

  openDialog(materialType: string): void{
    const dialogRef = this.dialog.open(MaterialsAddGialogComponent, { data: {materialType}});
    dialogRef.afterClosed().pipe(
      tap((material: MaterialAdd) => {
        if(material){
          this.MaterialsFacade.createMaterials(material)
        }
      }),
      take(1),
    ).subscribe()
  }
}
