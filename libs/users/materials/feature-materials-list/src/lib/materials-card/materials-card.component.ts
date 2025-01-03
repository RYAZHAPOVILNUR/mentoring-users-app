import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { IMaterial } from '../../../../data-access/src/lib/models/material.model';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsContentComponent } from '@users/materials-content';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input({ required: true }) material!: IMaterial;
  @Output() public deleteMaterial = new EventEmitter();

  readonly dialog = inject(MatDialog);

  public onDeleteMaterial($event: MouseEvent, id: number) {
    $event.stopPropagation();
    this.deleteMaterial.emit(id);
  }

  public openContent(material: IMaterial) {
    this.dialog.open(MaterialsContentComponent, { data: material });
  }
}
