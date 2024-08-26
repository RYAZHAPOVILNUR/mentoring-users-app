import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MaterialVM } from '@users/materials/data-access';
import { LocaleDateFormatPipe } from '@users/pipes';

@Component({
  selector: 'materials-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule, MatMenuModule, LocaleDateFormatPipe],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  public showDeleteButton: boolean = false;

  @Input({required: true})
  material!: MaterialVM;

  @Output() openMaterialFile = new EventEmitter()
  @Output() deleteMaterial = new EventEmitter()

  onOpenMaterialFile() {
    this.openMaterialFile.emit()
  }

  onDeleteMaterial(event: Event) {
    event.stopPropagation();
    this.deleteMaterial.emit()
  }

}
