import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ChangeThemeComponent } from 'libs/users/settings/feature-change-theme/src/lib/change-theme-settings/change-theme.component'

@Component({
  selector: 'users-settings-view',
  standalone: true,
  imports: [CommonModule, MatCardModule, ChangeThemeComponent],
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.scss'],
})
export class SettingsViewComponent {}
