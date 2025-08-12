import { NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListItemIcon } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';

import { LanguageKeys, LanguageService } from '@shared/util-language';
import { AuthStore } from '@users/core/data-access-auth';

import { ThemePickerComponent } from './theme-picker/theme-picker.component';

@Component({
  selector: 'users-header',
  standalone: true,
  imports: [
    TranslateModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    MatMenuModule,
    PushPipe,
    ThemePickerComponent,
    MatListItemIcon,
    NgIf,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private readonly authStore = inject(AuthStore);
  private readonly languageSwitchService = inject(LanguageService);
  public readonly isLoggedUser = this.authStore.loggedUserId;
  public readonly isAdmin = this.authStore.isAdmin;
  public readonly selectedLanguage$ = this.languageSwitchService.selectedLanguage$;

  @Output() sidenavToggle = new EventEmitter();

  public onLogout() {
    this.authStore.logout();
  }

  public onSwitchLanguage(language: LanguageKeys) {
    this.languageSwitchService.setLanguage(language);
  }

  public onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
