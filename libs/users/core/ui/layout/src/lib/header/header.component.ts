import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {AuthFacade} from "../../../../../../../core/auth/data-access/src/lib/+state/auth.facade";
import {map, Observable} from "rxjs";
import {PushPipe} from "@ngrx/component";
import {MatMenuModule} from "@angular/material/menu";


@Component({
  selector: 'lib-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatToolbarModule, RouterModule, PushPipe, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  facade = inject(AuthFacade)
  isAuthenticated$: Observable<number | null> = this.facade.isAuthenticated$
  username$: Observable<string> = this.facade.user$.pipe(map(user => user.name))
  isAdmin$: Observable<boolean | null> = this.facade.isAdmin$

  public onLogout() {
    this.facade.logout()
  }
}
