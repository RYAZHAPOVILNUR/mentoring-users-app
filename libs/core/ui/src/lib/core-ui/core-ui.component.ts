import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-core-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './core-ui.component.html',
  styleUrls: ['./core-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreUiComponent {}
