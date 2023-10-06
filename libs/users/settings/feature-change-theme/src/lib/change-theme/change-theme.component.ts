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
import { ColorPickerModule } from 'ngx-color-picker';
import { ThemeStorage, DocsSiteTheme } from '../change-theme-storage/change-theme-storage';
import { Subscription } from 'rxjs';
import {map} from 'rxjs/operators';
import { StyleManager } from '../style-manager';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';

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
    ColorPickerModule
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
      primary: '#673AB7',
      accent: '#FFC107',
      name: 'light-violent',
      displayName: 'Light Violent',
      isDark: false,
      isDefault: true,
    },
    {
      primary: '#673AB7',
      accent: '#FFC107',
      name: 'light-green',
      displayName: 'Light Green',
      isDark: false,
    },
    {
      primary: '#673AB7',
      accent: '#FFC107',
      name: 'light-red',
      displayName: 'Light Red',
      isDark: false,
    },
    {
      primary: '#673AB7',
      accent: '#FFC107',
      name: 'dark-violent',
      displayName: 'Dark Violent',
      isDark: true,
    },
    {
      primary: '#388E3C',
      accent: '#FF9100',
      name: 'dark-green',
      displayName: 'Dark Green',
      isDark: true,
    },
    {
      primary: '#673AB7',
      accent: '#FFC107',
      name: 'dark-red',
      displayName: 'Dark Red',
      isDark: true,
    },
  ];

  constructor(public styleManager: StyleManager,
    private themeStorage: ThemeStorage,
    private activatedRoute: ActivatedRoute,
    private liveAnnouncer: LiveAnnouncer) {
      const themeName = this.themeStorage.getStoredThemeName();

      if (themeName) {
        this.selectTheme(themeName);
      } else {
        this.themes.find(themes => {
          if (themes.isDefault === true) {
            this.selectTheme(themes.name);
          }
        })
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
    const theme = this.themes.find(currentTheme => currentTheme.name === themeName);

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
      this.liveAnnouncer.announce(`${theme.displayName} theme selected.`, 'polite', 3000);
      this.themeStorage.storeTheme(this.currentTheme);
    }
  }

  color: string = '';

  onOKButtonClick() {
    console.log('Value on OK Button Click:', this.color);
  }
}
