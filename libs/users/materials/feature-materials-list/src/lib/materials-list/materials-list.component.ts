import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { IMaterialListVM } from './materialListVM';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IMaterial } from 'libs/users/materials/data-access/src/lib/models/material.model';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MaterialsCardComponent, MatIconModule, MatButtonModule],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({required: true}) vm!:IMaterialListVM;
  @Output() deleteMaterial = new EventEmitter();
  @Output() backButton = new EventEmitter();
  @Output() openMaterial = new EventEmitter();

  public onDeleteMaterial(id:number) {
    this.deleteMaterial.emit(id);
  }

  public onBackButton() {
    this.backButton.emit();
  }

  public onOpenMaterial(material: IMaterial) {
    this.openMaterial.emit(material);
  }
}
