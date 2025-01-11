import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialsEntity} from '@users/materials/data-access';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({ required: true }) material$: MaterialsEntity | undefined;
}
