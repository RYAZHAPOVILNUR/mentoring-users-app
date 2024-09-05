import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeepReadonly } from '@users/core/utils';
import { MaterialsEntity } from '@users/materials/data-access';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MaterialsCardComponent],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MaterialsListComponent {
  @Input({ required: true }) vm!: MaterialsListVM;
}

export type MaterialsListVM = DeepReadonly<{
  materials: MaterialsVM[];
}>;

export type MaterialsVM = DeepReadonly<MaterialsEntity>;