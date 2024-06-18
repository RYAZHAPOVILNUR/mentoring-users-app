import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardUiComponent } from '@users/materials/feature-folders-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsCardUiComponent } from '../materials-card-ui/materials-card-ui.component';
import { MaterialEntity } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-list-ui',
  standalone: true,
  imports: [CommonModule, FoldersCardUiComponent, MatProgressBarModule, MaterialsCardUiComponent],
  templateUrl: './materials-list-ui.component.html',
  styleUrls: ['./materials-list-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsListUiComponent {
  @Input({ required: true }) materials!: MaterialEntity[];
  @Input({ required: true }) status!: string;
}








