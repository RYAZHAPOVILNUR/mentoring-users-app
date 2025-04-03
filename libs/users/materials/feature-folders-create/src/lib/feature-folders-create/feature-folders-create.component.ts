import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-feature-folders-create',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-folders-create.component.html',
  styleUrls: ['./feature-folders-create.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureFoldersCreateComponent {}
