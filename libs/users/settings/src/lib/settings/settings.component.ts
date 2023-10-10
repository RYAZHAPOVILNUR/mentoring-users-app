import { inject } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { LanguageKeys, LanguageSwitchService } from '@users/users/core/ui/language-switch';
import { PushPipe } from '@ngrx/component';

@Component({
  selector: 'users-settings',
  standalone: true,
  imports: [CommonModule, MatButtonModule, PushPipe],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  private readonly languageSwitchService = inject(LanguageSwitchService);
  public readonly selectedLanguage$ = this.languageSwitchService.selectedLanguage$
  
  public articleStyle = 'LIST'



  public onSwitchLanguage(language: LanguageKeys) {
    this.languageSwitchService.setLanguage(language);
  }
}
