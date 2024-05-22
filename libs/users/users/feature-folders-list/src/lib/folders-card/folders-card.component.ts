import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDatePipe, MaterialType } from '@users/settings/data-access';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { MaterialsAddButtonComponent } from '@users/feature-materials-create';
import { MaterialsCardComponent } from '@users/feature-materials-list';
import { deleteMaterial, getMaterialList, loadMaterials } from '@users/materials/data-access';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  imports: [
    CommonModule,
    RouterLink,
    CustomDatePipe,
    FoldersCardComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MaterialsAddButtonComponent
  ]
})
export class FoldersCardComponent implements OnInit {
  id: number;
  public materials: BehaviorSubject<MaterialType[]> = new BehaviorSubject<MaterialType[]>([]);

  constructor(
    private activateRoute: ActivatedRoute,
    public dialog: MatDialog,
    private store: Store
  ) { this.id = activateRoute.snapshot.params["id"] }

  ngOnInit(): void {
    this.getMaterial(this.id)
  }

  getMaterial(idFolder: number) {
    this.store.dispatch(loadMaterials());
    this.store.select(getMaterialList).subscribe(data => {
      const filterData = data.filter(elem => elem.folder_id == idFolder);
      this.materials.next(filterData);
    });
  }

  removeMaterial(materialId: number) {
    this.store.dispatch(deleteMaterial({ id: materialId }))
    this.store.select(getMaterialList).subscribe(data => {
      const filterData = data.filter(elem => elem.folder_id == this.id);
      this.materials.next(filterData);
    });
  }

  openMaterial(materialId: number) {
    const dialogRef = this.dialog.open(MaterialsCardComponent,
      {
        width: '80%',
        height: '90%',
        data: { materialId: materialId }
      });
    dialogRef.afterClosed().subscribe();
  }
}
