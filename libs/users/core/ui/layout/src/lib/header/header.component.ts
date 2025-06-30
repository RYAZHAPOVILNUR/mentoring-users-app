import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { AuthFacade } from '@users/data-access-auth';
import { LanguageKeys, LanguageSwitchService } from '@users/users/core/ui/language-switch';
import { ChangeThemeHeaderComponent } from '@users/users/settings/feature-change-theme';

@Component({
  selector: 'lib-header',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    MatMenuModule,
    PushPipe,
    ChangeThemeHeaderComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private readonly facade = inject(AuthFacade);
  private readonly languageSwitchService = inject(LanguageSwitchService);
  public readonly isAuthenticated$: Observable<boolean> = this.facade.isAuthenticated$;
  public readonly isAdmin$: Observable<boolean | null> = this.facade.isAdmin$;
  public readonly selectedLanguage$ = this.languageSwitchService.selectedLanguage$;

  @Output() sidenavToggle = new EventEmitter();

  public onLogout() {
    this.facade.logout();
  }

  public onSwitchLanguage(language: LanguageKeys) {
    this.languageSwitchService.setLanguage(language);
  }

  public onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
