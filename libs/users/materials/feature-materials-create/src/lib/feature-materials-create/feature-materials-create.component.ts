import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-feature-materials-create',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-materials-create.component.html',
  styleUrls: ['./feature-materials-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureMaterialsCreateComponent {}
