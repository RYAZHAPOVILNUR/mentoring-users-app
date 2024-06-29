import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-feature-materials-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-materials-content.component.html',
  styleUrls: ['./feature-materials-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureMaterialsContentComponent {}
