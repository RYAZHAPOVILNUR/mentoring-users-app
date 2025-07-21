import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

import { AuthStore } from '@users/core/data-access-auth';

@Component({
  standalone: true,
  imports: [RouterModule, MatSidenavModule, MatIconModule, MatButtonModule],
  providers: [],
  selector: 'users-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly store = inject(AuthStore);
  events: string[] = [];

  ngOnInit(): void {
    this.store.getUser();
  }
}
