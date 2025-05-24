import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-materials-content-feature',
  imports: [CommonModule],
  templateUrl: './materials-content-feature.component.html',
  styleUrl: './materials-content-feature.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentFeatureComponent {}
