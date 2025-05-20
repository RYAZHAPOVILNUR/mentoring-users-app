import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MaterialsVM } from './materials-list-view-model';
import { RouterModule } from '@angular/router';
import { MaterialsAddButtonComponent } from '@users/feature-materials-create';
import { MaterialsType } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [ CommonModule, MaterialsCardComponent, MatIconModule, MatButtonModule, RouterModule, MaterialsAddButtonComponent],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  
  @Input({required: true})
  vm!: MaterialsVM;

  @Output() deleteMaterial = new EventEmitter();

  public onDeleteMaterial(material: MaterialsType) {
    this.deleteMaterial.emit(material)
  }
  
}
