import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMaterial } from '@users/materials/data-access';
import { MaterialsVM } from '../../../../data-access/src/lib/models/materialsVm';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MaterialsAddButtonComponent } from '../../feature-materials-create/materials-add-button/materials-add-button.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MaterialsCardComponent,
    MaterialsAddButtonComponent,
    MatButtonModule,
  ],
})
export class MaterialsListComponent {
  @Input({ required: true })
  vm!: MaterialsVM;

  @Output() backOnFolders = new EventEmitter();
  @Output() deleteMaterial = new EventEmitter();

  public onBackOnFolders() {
    this.backOnFolders.emit();
  }

  public onDeleteMaterial(material: IMaterial) {
    this.deleteMaterial.emit(material);
  }
}
