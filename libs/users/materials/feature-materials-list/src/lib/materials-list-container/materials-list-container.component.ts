import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-feature-materials-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-materials-list.component.html',
  styleUrls: ['./feature-materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureMaterialsListComponent {}
