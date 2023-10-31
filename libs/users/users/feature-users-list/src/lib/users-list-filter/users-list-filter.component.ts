import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PushPipe } from "@ngrx/component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'users-list-filter',
  standalone: true,
  templateUrl: './users-list-filter.component.html',
  styleUrls: ['./users-list-filter.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    PushPipe,
    TranslateModule
  ]
})

export class UsersListFilterComponent {
  @Output() filterUsers = new EventEmitter();
  private readonly router = inject(Router);
  protected filterName = '';

  OnFiltredUsers() {
    this.filterUsers.emit({ name: this.filterName });
  }

  clearFilterName() {
    this.filterName = '';
    this.filterUsers.emit({ name: this.filterName });
    this.router.navigate(['/admin/users'])
  }
}


