import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { map, take, withLatestFrom } from 'rxjs';

import { AuthStore } from '@users/core/data-access-auth';

import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    PushPipe,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    NavbarComponent,
    NgIf,
  ],
  templateUrl: './authorized-layout.component.html',
  styleUrls: ['./authorized-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorizedLayoutComponent {
  private readonly authStore = inject(AuthStore);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly handset$ = this.breakpointObserver.observe(Breakpoints.Handset);
  private readonly handsetLandscape$ = this.breakpointObserver.observe(Breakpoints.HandsetLandscape);

  public readonly isAuthenticated = this.authStore.isAuthenticated;

  public readonly isMobile$ = this.handset$.pipe(
    withLatestFrom(this.handsetLandscape$),
    map(([handset, handsetLandscape]) => handset.matches && !handsetLandscape.matches),
  );

  opened!: boolean;

  public closeSidenavOnTouch(sidenav: MatSidenav) {
    this.isMobile$.pipe(take(1)).subscribe((isMobile$) => {
      if (isMobile$) {
        sidenav.close();
      }
    });
  }
}
