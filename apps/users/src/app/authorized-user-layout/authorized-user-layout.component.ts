import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FooterComponent, HeaderComponent, NavbarComponent } from '@users/core/ui/layout';
import { PushPipe } from '@ngrx/component';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { AuthFacade } from '@auth/data-access';
import { Observable, map, take, tap, withLatestFrom } from 'rxjs';
import { RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
  public readonly breakpointObserver = inject(BreakpointObserver);
  public readonly isAuthenticated$: Observable<boolean> = this.facade.isAuthenticated$;
  private readonly handset$ = this.breakpointObserver.observe(Breakpoints.Handset);
  private readonly handsetLandscape$ = this.breakpointObserver.observe(Breakpoints.HandsetLandscape);
  public readonly isMobile$ = this.handset$.pipe(
    withLatestFrom(this.handsetLandscape$),
    map(([handset, handsetLandscape]) => !!(handset.matches && !handsetLandscape.matches))
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
