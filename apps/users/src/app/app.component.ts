import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { authActions } from '@auth/data-access';
import { Store } from '@ngrx/store';
import { FooterComponent, HeaderComponent } from "@users/core/ui/layout";
import {AuthFacade} from "@auth/data-access";
import {Observable} from "rxjs";
import {NgIf} from "@angular/common";
import {PushPipe} from "@ngrx/component";

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent, NgIf, PushPipe],
  providers: [],
  selector: 'users-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly store = inject(Store);
  private readonly facade = inject(AuthFacade)
  public readonly isAuthenticated$: Observable<boolean> = this.facade.isAuthenticated$

  constructor() {
    this.store.dispatch(authActions.getUser());
  }
}
