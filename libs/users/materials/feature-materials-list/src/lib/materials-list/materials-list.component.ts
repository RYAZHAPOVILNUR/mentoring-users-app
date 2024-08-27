import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-feature-materials-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureMaterialsListComponent {}
