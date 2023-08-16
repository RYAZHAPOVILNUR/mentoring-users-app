import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FooterComponent, HeaderComponent, NavbarComponent } from '@users/core/ui/layout';
import { PushPipe } from '@ngrx/component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { AuthFacade } from '@auth/data-access';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';

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
    NavbarComponent
  ],
  templateUrl: './authorized-user-layout.component.html',
  styleUrls: ['./authorized-user-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorizedUserLayoutComponent {
  private readonly store = inject(Store);
  private readonly facade = inject(AuthFacade);
  public readonly isAuthenticated$: Observable<boolean> =
    this.facade.isAuthenticated$;
  opened!: boolean;
  events: string[] = [];

}
