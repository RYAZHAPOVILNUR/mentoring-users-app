import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { ThemeStorage } from '../change-theme-storage/change-theme-storage';
import { DocsSiteTheme } from '../interfaces/docs-site-theme.interface';
import { StyleManager } from '../style-manager';

@Component({
  selector: 'users-change-theme-header',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
  ],
  templateUrl: './change-theme-header.component.html',
  styleUrls: ['./change-theme-header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeThemeHeaderComponent implements OnInit, OnDestroy {
  private queryParamSubscription = Subscription.EMPTY;
  currentTheme: DocsSiteTheme | undefined;

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
  ];

  constructor(
    public styleManager: StyleManager,
    private themeStorage: ThemeStorage,
    private activatedRoute: ActivatedRoute,
  ) {
    const themeName = this.themeStorage.getStoredThemeName();

    if (themeName) {
      this.selectTheme(themeName);
    } else {
      this.themes.find((theme) => {
        if (theme.isDefault === true) {
          this.selectTheme(theme.name);
        }
      });
    }
  }

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
    const theme = this.themes.find((currentTheme) => currentTheme.name === themeName);

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
