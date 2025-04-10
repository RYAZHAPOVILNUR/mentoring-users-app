import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Material } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: 
  [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input() material: Material | undefined;
  @Output() deleteFolder = new EventEmitter();
  @Output() openFolder = new EventEmitter();

   onOpenMaterial(materialId?: number): void {
    console.log("onOpenMaterial", materialId)
   }

   onDeleteMaterial(materialId?: number, event?: Event): void {
    console.log("onDeleteMaterial", materialId, event)
   }
}
