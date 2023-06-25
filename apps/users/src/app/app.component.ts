import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalStorageJwtService, authActions } from '@auth/data-access';
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
export class AppComponent implements OnInit {
  title = 'users';
  private readonly store = inject(Store);
  private readonly localStorageJwtService = inject(LocalStorageJwtService);

  ngOnInit() {
    if (this.localStorageJwtService.getItem()) {
      this.store.dispatch(authActions.getUser());
    }
  }
}
