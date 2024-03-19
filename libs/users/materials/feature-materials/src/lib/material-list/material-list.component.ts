import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsVM } from './material-list.model';
import { FeatureMaterialsCardComponent } from '../feature-materials-card/feature-materials-card.component';
import { FeatureMaterialsAddBtnComponent } from '../feature-materials-add-btn/feature-materials-add-btn.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MaterialEntity } from 'libs/users/materials/data-access/src/lib/model/material.entity';

@Component({
  selector: 'users-material-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FeatureMaterialsCardComponent, 
    FeatureMaterialsAddBtnComponent
  ],
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialListComponent {
  @Input({required: true})
  vm!: MaterialsVM;

  @Output() backOnFolders = new EventEmitter();
  @Output() deleteMaterial = new EventEmitter();

  public onBackOnFolders() {
    this.backOnFolders.emit()
  }

  public onDeleteMaterial(material: MaterialEntity) {
    this.deleteMaterial.emit(material)
  }
}
