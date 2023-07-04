import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { authActions } from '@auth/data-access';
import { Store } from '@ngrx/store';
import { FooterComponent, HeaderComponent } from "@users/core/ui/layout";

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent],
  providers: [],
  selector: 'users-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly store = inject(Store);

  constructor() {
    this.store.dispatch(authActions.getUser());
  }
}
