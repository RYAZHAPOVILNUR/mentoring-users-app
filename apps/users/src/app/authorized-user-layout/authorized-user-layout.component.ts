import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { map, Observable, take, withLatestFrom } from 'rxjs';

import { FooterComponent, HeaderComponent, NavbarComponent } from '@users/core/ui/layout';
import { AuthFacade } from '@users/data-access-auth';

@Component({
  selector: 'users-authorized-user-layout',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    NgIf,
    PushPipe,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    NavbarComponent,
  ],
  templateUrl: './authorized-user-layout.component.html',
  styleUrls: ['./authorized-user-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorizedUserLayoutComponent {
  private readonly store = inject(Store);
  private readonly facade = inject(AuthFacade);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly handset$ = this.breakpointObserver.observe(Breakpoints.Handset);
  private readonly handsetLandscape$ = this.breakpointObserver.observe(Breakpoints.HandsetLandscape);

  public readonly isAuthenticated$: Observable<boolean> = this.facade.isAuthenticated$;

  public readonly isMobile$ = this.handset$.pipe(
    withLatestFrom(this.handsetLandscape$),
    map(([handset, handsetLandscape]) => !!(handset.matches && !handsetLandscape.matches)),
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
