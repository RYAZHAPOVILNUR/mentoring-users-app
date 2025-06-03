import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthStore } from '@auth/data-access';
import { Store } from '@ngrx/store';
import { AuthFacade } from '@auth/data-access';
import { Observable } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'libs/core/auth/data-access/src/lib/+state/auth.service';

@Component({
  standalone: true,
  imports: [RouterModule, MatSidenavModule, MatIconModule, MatButtonModule],
  providers: [],
  selector: 'users-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly authService = inject(AuthService);
  private readonly facade = inject(AuthFacade);
  public readonly isAuthenticated$: Observable<boolean> = this.facade.isAuthenticated$;
  opened!: boolean;
  events: string[] = [];

  constructor() {
    this.authService.getUser();
  }
}
