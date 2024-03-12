import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingStatus } from '@users/core/data-access';
import { createdMaterial, Material } from '@users/materials/data-access';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsAddButtonComponent } from '@users/materials/feature-materials-create';
@Component({
  selector: 'materials-list',
  standalone: true,
  imports: [
    CommonModule,
    MaterialsCardComponent,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MaterialsAddButtonComponent

  ],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({ required: true })
  vm!: {
    status: LoadingStatus,
    materials: Material[],
    folderName?: string
  }
  @Output()
  deleteMaterial = new EventEmitter<number>();
  @Output()
  redirectToBack = new EventEmitter();
  @Output()
  createMaterial = new EventEmitter<Omit<createdMaterial, "folder_id">>();
  public onRedirectToBack() {
    this.redirectToBack.emit()
  }
  public onCreateMaterial(createdMaterial: Omit<createdMaterial, "folder_id">) {
    this.createMaterial.emit(createdMaterial)
  }
  public onDeleteMaterial(material: Material) {
    this.deleteMaterial.emit(material.id)
  }
}
