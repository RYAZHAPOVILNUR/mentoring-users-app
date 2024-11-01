import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MaterialsListVM } from './materials-list.vm';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsVM } from '@users/materials';
import {
  MaterialsContentComponent
} from '@users/materials/feature-materials-content';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MaterialsCardComponent, MatButtonModule, MatIconModule],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsListComponent {
  public dialog = inject(MatDialog);
  @Input({ required: true }) materialVm!: MaterialsListVM;
  @Output() deleteMaterial = new EventEmitter<number>();

  public onDeleteMaterial(materialId: number): void {
    this.deleteMaterial.emit(materialId);
  }

  public openMaterial(material: MaterialsVM): void {
    this.dialog.open(MaterialsContentComponent, {
      width: '80%',
      data: { type: material.type, url: material.materialLink }
    });
  }
}
