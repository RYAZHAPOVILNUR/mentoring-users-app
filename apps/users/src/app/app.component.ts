import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { authActions } from '@auth/data-access';
import { Store } from '@ngrx/store';
import { FooterComponent, HeaderComponent } from '@users/core/ui/layout';
import { AuthFacade } from '@auth/data-access';
import { Observable, Subject } from 'rxjs';
import { NgIf } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    NgIf,
    PushPipe,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
  ],
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
