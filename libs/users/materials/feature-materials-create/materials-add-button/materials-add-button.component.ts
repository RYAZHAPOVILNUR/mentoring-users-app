import { Component, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsAddDialogComponent } from '@users/feature-materials-create';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialsFacade } from '../../data-access/src/lib/+state/materials.facade';
import { CreateMaterialDTO } from '../../data-access/src/lib/models/materials-dto.model';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MaterialsAddDialogComponent
  ],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
})
export class MaterialsAddButtonComponent {
  matDialog = inject(MatDialog);
  matDialogMaterialAdd:  MatDialogRef<MaterialsAddDialogComponent> | undefined;
  materialsFacade = inject(MaterialsFacade);
  @Input({required: true}) idFolder!: number; 
  
  openAddMaterialDialog(){
    this.matDialogMaterialAdd = this.matDialog.open(MaterialsAddDialogComponent,{
      width: '350px',
      data: {idFolder: this.idFolder}
    });
    this.matDialogMaterialAdd.afterClosed().pipe().subscribe((newMaterial)=>{
      if(newMaterial)
        this.addMaterial(newMaterial)
    })
  }
  addMaterial(newMaterial: CreateMaterialDTO){
    this.materialsFacade.addMaterial(newMaterial);
  }
}
