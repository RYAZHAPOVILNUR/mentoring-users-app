import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent, HeaderComponent } from '@users/core/ui/layout';
import { AuthFacade, AuthStore } from '@auth/data-access';
import { Observable } from 'rxjs';
import { NgIf } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { toObservable } from '@angular/core/rxjs-interop';


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
  private readonly authStore = inject(AuthStore);
  private readonly facade = inject(AuthFacade);
  public readonly isAuthenticated$ = toObservable(this.facade.isAuthenticated$);
  opened!: boolean;
  events: string[] = [];
  
  constructor() {
    this.authStore.getUser();
  }
}
