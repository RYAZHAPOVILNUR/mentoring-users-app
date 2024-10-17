import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { getMaterialType, MaterialsEntity, MaterialsVM } from '@users/materials/data-access';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsViewerComponent } from '../materials-viewer/materials-viewer.component';
import { MaterialFileType } from '@users/core/data-access';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MaterialsCardComponent implements OnInit {
  @Input({ required: true }) material!: MaterialsVM;
  @Output() deleteMaterial = new EventEmitter();
  public dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  showDeleteButton = false;
  fileType = '';

  MaterialFileType = MaterialFileType;

  ngOnInit() {
    this.initFileType();
  }

  private initFileType() {
    this.fileType = getMaterialType(this.material.material_link);
  }

  onDeleteMaterial(event: Event, material: MaterialsEntity) {
    event.stopPropagation();
    this.deleteMaterial.emit(material);
  }

  openMaterialViewer(): void {
    this.dialog.open(MaterialsViewerComponent, {
      data: this.material,
    });
  }
}