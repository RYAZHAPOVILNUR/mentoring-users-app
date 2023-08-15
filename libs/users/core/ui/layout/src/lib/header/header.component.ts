import {Component, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {AuthFacade} from "@auth/data-access";
import {map, Observable} from "rxjs";
import {MatMenuModule} from "@angular/material/menu";
import { PushPipe } from '@ngrx/component';
import { ThemeSwitchService } from '@users/users/core/ui/theme-switch';




@Component({
  selector: 'lib-header',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatToolbarModule,
    MatIconModule,
    RouterModule, 
    MatMenuModule, 
    PushPipe
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{
  private readonly facade = inject(AuthFacade)
  private readonly themeSwitch = inject(ThemeSwitchService);
  public readonly isAuthenticated$: Observable<boolean> = this.facade.isAuthenticated$
  public readonly isDarkTheme$: Observable<boolean> = this.themeSwitch.isDarkTheme$;
  public readonly username$: Observable<string> = this.facade.user$.pipe(map(user => user.name))
  public readonly isAdmin$: Observable<boolean | null> = this.facade.isAdmin$
  public readonly userPhoto: Observable<string | undefined> = this.facade.user$.pipe(map(user => user.photo?.url))

  public photo: any

  ngOnInit(): void {
    this.photo = this.userPhoto ? this.userPhoto : ''
  }

  public onLogout() {
    this.facade.logout()
  }

  public onSwitchTheme() {
    this.themeSwitch.switchTheme()
  }
}

