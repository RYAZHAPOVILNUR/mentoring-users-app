import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsEntity } from '../../data-access/src/lib/models/materials.entity';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsContentComponent } from '@users/feature-materials-content'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TypeMaterialsPipe } from '../../type-materials.pipe';
import { MaterialType } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MaterialsContentComponent,
    MatInputModule,
    MatButtonModule,
    TypeMaterialsPipe
  ],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
})
export class MaterialsCardComponent {
  @Input({required: true}) material!: MaterialsEntity;
  typeMaterial: MaterialType = 'undefined';
  @Output() deleteMaterial = new EventEmitter<MaterialsEntity>();
  matDialog = inject(MatDialog);
  matDialogMaterialAdd:  MatDialogRef<MaterialsContentComponent> | undefined;

  openViewMaterialDialog(){
    this.matDialogMaterialAdd = this.matDialog.open(MaterialsContentComponent,{
      data: {material: this.material}
    });
    this.matDialogMaterialAdd.afterClosed().pipe().subscribe;
  }

  onDeleteMaterial(){
    this.deleteMaterial.emit(this.material);
  }
}