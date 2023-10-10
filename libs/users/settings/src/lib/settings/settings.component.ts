import { inject } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { LanguageKeys, LanguageSwitchService } from '@users/users/core/ui/language-switch';
import { PushPipe } from '@ngrx/component';
import { ThemeSwitchService } from '@users/users/core/ui/theme-switch';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-settings',
  standalone: true,
  imports: [CommonModule, MatButtonModule, PushPipe, MatIconModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  private readonly languageSwitchService = inject(LanguageSwitchService);
  public readonly selectedLanguage$ = this.languageSwitchService.selectedLanguage$
  private readonly themeSwitchService = inject(ThemeSwitchService);
  public readonly isDarkTheme$: Observable<boolean> = this.themeSwitchService.isDarkTheme$;
  public articleStyle = 'LIST'

  public onSwitchTheme() {
    this.themeSwitchService.switchTheme()
  }

  public onSwitchLanguage(language: LanguageKeys) {
    this.languageSwitchService.setLanguage(language);
  }
}
