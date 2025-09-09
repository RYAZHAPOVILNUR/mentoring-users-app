import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions, AuthFacade } from '@users/core/data-access-auth';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [RouterModule, MatSidenavModule, MatIconModule, MatButtonModule],
  providers: [],
  selector: 'users-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly store = inject(Store);
  private readonly facade = inject(AuthFacade);
  public readonly isAuthenticated$: Observable<boolean> = this.facade.isAuthenticated$;
  opened!: boolean;
  events: string[] = [];

  constructor() {
    this.store.dispatch(authActions.getUser());
  }
}
