import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialDTO } from '@users/materials/data-access';
import { MaterialsListVM } from './materials-list-view-model';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MaterialsCardComponent,
    MatProgressBarModule
  ],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
      @Input({ required: true })
      vm!: MaterialsListVM;
  
      @Output() deleteMaterial = new EventEmitter();
      @Output() openMaterial = new EventEmitter();
  
      onDeleteMaterial(material: MaterialDTO) {
      this.deleteMaterial.emit(material);
      }

      onOpenMaterial(material: MaterialDTO) {
        this.openMaterial.emit(material);
        }
  
}
