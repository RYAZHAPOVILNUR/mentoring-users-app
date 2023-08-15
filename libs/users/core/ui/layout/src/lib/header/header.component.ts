import {Component, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {AuthFacade} from "@auth/data-access";
import {map, Observable} from "rxjs";
import {MatMenuModule} from "@angular/material/menu";
import { PushPipe } from '@ngrx/component';




@Component({
  selector: 'lib-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatToolbarModule, RouterModule, MatMenuModule, PushPipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private readonly facade = inject(AuthFacade)
  public readonly isAdmin$: Observable<boolean | null> = this.facade.isAdmin$
}

