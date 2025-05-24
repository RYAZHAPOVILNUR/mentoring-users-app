import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-materials-content-container',
  imports: [CommonModule],
  templateUrl: './materials-content-container.component.html',
  styleUrl: './materials-content-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentContainerComponent {}
