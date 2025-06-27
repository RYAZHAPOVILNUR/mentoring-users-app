import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';

import { SettingsFacade } from '@users/settings/data-access';
import { LanguageKeys, LanguageSwitchService } from '@users/users/core/ui/language-switch';
import { ChangeThemeComponent } from '@users/users/settings/feature-change-theme';

@Component({
  selector: 'users-settings',
  standalone: true,
  imports: [CommonModule, MatButtonModule, PushPipe, MatIconModule, MatCardModule, ChangeThemeComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  private readonly store = inject(Store);

  private readonly languageSwitchService = inject(LanguageSwitchService);
  private settingsFacade = inject(SettingsFacade);
  public readonly selectedLanguage$ = this.languageSwitchService.selectedLanguage$;
  public articleStyle$ = this.settingsFacade.articlesViewStyleType$;

  ngOnInit(): void {
    this.settingsFacade.getSettings();
  }

  changeArticlesStyleType(styleType: string): void {
    this.settingsFacade.setArticlesStyleType(styleType);
  }

  public onSwitchLanguage(language: LanguageKeys) {
    this.languageSwitchService.setLanguage(language);
  }
}
