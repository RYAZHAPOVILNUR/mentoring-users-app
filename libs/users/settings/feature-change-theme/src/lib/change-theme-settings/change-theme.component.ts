import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSliderModule } from '@angular/material/slider';
import {
  ThemeStorage,
  DocsSiteTheme,
} from '../change-theme-storage/change-theme-storage';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { StyleManager } from '../style-manager';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'users-change-theme',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatSliderModule,
    FormsModule,
  ],
  templateUrl: './change-theme.component.html',
  styleUrls: ['./change-theme.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeThemeComponent implements OnInit, OnDestroy {
  currentTheme: DocsSiteTheme | undefined;
  private queryParamSubscription = Subscription.EMPTY;

  themes: DocsSiteTheme[] = [
    {
      name: 'light-violent',
      displayName: 'Light Violent',
      isDefault: true,
    },
    {
      name: 'light-green',
      displayName: 'Light Green',
    },
    {
      name: 'light-red',
      displayName: 'Light Red',
    },
    {
      name: 'dark-violent',
      displayName: 'Dark Violent',
    },
    {
      name: 'dark-green',
      displayName: 'Dark Green',
    },
    {
      name: 'dark-red',
      displayName: 'Dark Red',
    },
    {
      name: 'custom-theme',
      displayName: 'Custom Theme',
    },
  ];

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

  constructor(
    public styleManager: StyleManager,
    private themeStorage: ThemeStorage,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.queryParamSubscription = this.activatedRoute.queryParamMap
      .pipe(map((params: ParamMap) => params.get('theme')))
      .subscribe((themeName: string | null) => {
        if (themeName) {
          this.selectTheme(themeName);
        }
      });
  }

  ngOnDestroy() {
    this.queryParamSubscription.unsubscribe();
  }

  selectTheme(themeName: string) {
    const theme = this.themes.find(
      (currentTheme) => currentTheme.name === themeName
    );

    if (!theme) {
      return;
    }

    this.currentTheme = theme;

    if (theme.isDefault) {
      this.styleManager.removeStyle('theme');
    } else {
      this.styleManager.setStyle('theme', `${theme.name}.css`);
    }

    if (this.currentTheme) {
      this.themeStorage.storeTheme(this.currentTheme);
    }
  }
}
