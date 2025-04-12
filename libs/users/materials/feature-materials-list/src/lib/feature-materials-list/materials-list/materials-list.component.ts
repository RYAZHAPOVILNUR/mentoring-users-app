import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Material } from '@users/materials/data-access';
import { MaterialsCardComponent } from '../materials-card/materials-card.component'
import { MaterialsAddButtonComponent } from '@users/materials/feature-materials-create'

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [
    CommonModule,
    MaterialsCardComponent,
    MaterialsAddButtonComponent
  ],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input() materials: Material[] = [];
  @Input() folderId: number | null = null;
}
