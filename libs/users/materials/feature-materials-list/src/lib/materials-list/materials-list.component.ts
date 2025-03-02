import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersDTO } from '../../../../../../core/data-access/src';
import { MaterialsListVM } from './materials-list-view-model';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';

@Component({
  selector: 'materials-list',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MaterialsCardComponent],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({ required: true }) vmf!: MaterialsListVM;
}
