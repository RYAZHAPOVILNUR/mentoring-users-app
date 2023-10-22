import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthFacade } from '@auth/data-access';
import { Observable } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { PushPipe } from '@ngrx/component';
import { LanguageKeys, LanguageSwitchService } from '@users/users/core/ui/language-switch';
import { ChangeThemeComponentHeader } from '@users/users/settings/feature-change-theme';
import { TimerService } from '@users/feature-timer';

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
    ChangeThemeComponentHeader,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private readonly facade = inject(AuthFacade)
  private readonly languageSwitchService = inject(LanguageSwitchService);
  private readonly timer = inject(TimerService);
  public readonly isAuthenticated$: Observable<boolean> = this.facade.isAuthenticated$
  public readonly isAdmin$: Observable<boolean | null> = this.facade.isAdmin$
  public readonly selectedLanguage$ = this.languageSwitchService.selectedLanguage$
  public readonly timerData$: Observable<{ days: number, hours: number, minutes: string, seconds: string }> = this.timer.getTimerValue()


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

