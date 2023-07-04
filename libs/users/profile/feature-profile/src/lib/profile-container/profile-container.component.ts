import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileFormUiComponent } from '../profile-form-ui/profile-form-ui.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'profile-container',
  standalone: true,
  imports: [CommonModule, ProfileFormUiComponent],
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileContainerComponent {}
