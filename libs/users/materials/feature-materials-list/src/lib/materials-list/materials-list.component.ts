import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MaterialsVM } from './materials-list.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IMaterial } from '@users/materials/data-access';
import { MaterialsAddButtonComponent } from '../../../../feature-materials-create/src/lib/materials-add-button/materials-add-button.component';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [
    CommonModule,
    MaterialsCardComponent,
    MatIconModule,
    MatButtonModule,
    MaterialsAddButtonComponent
  ],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({required: true})
  vm!: MaterialsVM;

  @Output() backOnFolders = new EventEmitter();
  @Output() deleteMaterial = new EventEmitter();

  public onBackOnFolders() {
    this.backOnFolders.emit()
  }

  public onDeleteMaterial(material: IMaterial) {
    this.deleteMaterial.emit(material)
  }
}
