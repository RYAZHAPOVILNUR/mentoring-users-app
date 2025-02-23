import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsAddButtonComponent } from "../materials-add-button/materials-add-button.component";
import { MaterialsCardComponent } from "../materials-card/materials-card.component";
import { Folder, Material } from '@users/materials/data-access';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MaterialsAddButtonComponent, MaterialsCardComponent],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  readonly dialog = inject(MatDialog);

  @Input()
  public allMaterials!: Material[];
  @Input()
  public openedFolder!: Folder | null;

  @Output()
  foldersBack = new EventEmitter()
  @Output()
  addMaterial = new EventEmitter()
  @Output()
  deleteMaterial = new EventEmitter()
  @Output()
  openMaterialCard = new EventEmitter()

  backFolders(): void {
    this.foldersBack.emit()
  }

  onAddMaterial(format: string) {
    this.addMaterial.emit(format)
  }

  onDeleteMaterial(material: Material) {
    this.deleteMaterial.emit(material)
  }

  onOpenMaterialCard(material: Material): void {
    this.openMaterialCard.emit(material)
  }
}
