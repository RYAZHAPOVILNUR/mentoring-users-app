import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-feature-materials-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-materials-card.component.html',
  styleUrls: ['./feature-materials-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureMaterialsCardComponent {}
