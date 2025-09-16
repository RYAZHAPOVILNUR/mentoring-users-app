import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { LanguageService, LanguageValues } from '@shared/util-language';
import { SettingsFacade } from '@users/settings/data-access-settings';

import { ThemeSettingComponent } from '../../components/theme-setting/theme-setting.component';

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule, PushPipe, MatIconModule, MatCardModule, ThemeSettingComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  private readonly store = inject(Store);

  private readonly languageSwitchService = inject(LanguageService);
  private settingsFacade = inject(SettingsFacade);
  public readonly selectedLanguage$ = this.languageSwitchService.selectedLanguage$;
  public articleStyle$ = this.settingsFacade.articlesViewStyleType$;

  ngOnInit(): void {
    this.settingsFacade.getSettings();
  }

  changeArticlesStyleType(styleType: string): void {
    this.settingsFacade.setArticlesStyleType(styleType);
  }

  onSwitchLanguage(language: LanguageValues) {
    this.languageSwitchService.setLanguage(language);
  }
}
