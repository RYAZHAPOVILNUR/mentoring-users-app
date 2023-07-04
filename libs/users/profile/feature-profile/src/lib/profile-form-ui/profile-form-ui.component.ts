import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'profile-form-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-form-ui.component.html',
  styleUrls: ['./profile-form-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFormUiComponent {}
