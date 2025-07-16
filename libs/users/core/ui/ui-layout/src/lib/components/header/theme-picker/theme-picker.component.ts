import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { Theme, ThemeService } from '@shared/data-access-theme';

@Component({
  selector: 'users-theme-picker',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatListModule, MatGridListModule, MatMenuModule],
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemePickerComponent {
  private readonly themeService = inject(ThemeService);

  selectTheme(name: Theme['name']) {
    this.themeService.selectTheme(name);
  }
}
