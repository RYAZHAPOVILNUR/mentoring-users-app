import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsListVM } from './materials-list-vm';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IMaterial } from '../../../../data-access/src/lib/+state/models/material.model';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressBarModule, MaterialsCardComponent],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {


  @Input ({ required: true })
  public vm!: MaterialsListVM;

  @Output() backToFolders = new EventEmitter();
  @Output() openMaterial = new EventEmitter();


  onBackToFolders(): void {
    this.backToFolders.emit()
  }

  public onOpenMaterial(material: IMaterial) {
    this.openMaterial.emit(material);
  }

}
