import { NgClass, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';

import { Theme, ThemeService } from '@shared/data-access-theme';

@Component({
  selector: 'users-theme-setting',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgClass,
    FormsModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatSliderModule,
    MatGridListModule,
  ],
  templateUrl: './theme-setting.component.html',
  styleUrls: ['./theme-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSettingComponent {
  colors: string[] = [
    'red',
    'pink',
    'purple',
    'deepPurple',
    'indigo',
    'blue',
    'cyan',
    'teal',
    'green',
    'lightGreen',
    'lime',
    'yellow',
    'amber',
    'orange',
    'brown',
    'blueGray',
  ];

  primaryValue = 500;
  secondaryValue = 500;
  selectedPrimaryColor: string | null = null;
  selectedSecondaryColor: string | null = null;

  primaryColors = this.colors.map((color) => ({
    color: `${color}-${this.primaryValue}`,
  }));
  secondaryColors = this.colors.map((color) => ({
    color: `${color}-${this.secondaryValue}`,
  }));

  constructor(private readonly themeService: ThemeService) {}
  primarySliderChange() {
    this.primaryColors = this.colors.map((color) => ({
      color: `${color}-${this.primaryValue}`,
    }));
  }

  secondarySliderChange() {
    this.secondaryColors = this.colors.map((color) => ({
      color: `${color}-${this.secondaryValue}`,
    }));
  }

  pickPrimaryColor(color: string) {
    if (this.selectedPrimaryColor === color) {
      this.selectedPrimaryColor = null;
    } else {
      this.selectedPrimaryColor = color;
    }
  }

  pickSecondaryColor(color: string) {
    if (this.selectedSecondaryColor === color) {
      this.selectedSecondaryColor = null;
    } else {
      this.selectedSecondaryColor = color;
    }
  }

  selectTheme(name: Theme['name']) {
    this.themeService.selectTheme(name);
  }
}
