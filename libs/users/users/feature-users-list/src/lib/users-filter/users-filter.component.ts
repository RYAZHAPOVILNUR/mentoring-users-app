import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { UsersFacade } from '../../../../data-access/src';
import { take, tap } from 'rxjs';

@Component({
  selector: 'users-users-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss']
})
export class UsersFilterComponent implements OnInit {
  private usersFacade = inject(UsersFacade);
  filter = new FormControl('');

  filterUsers() {
    this.usersFacade.setUsersFilter({ name: this.filter.value });
  }

  ngOnInit() {
    this.usersFacade.filter$
      .pipe(
        take(1),
        tap(filterValue => {
          this.filter.setValue(filterValue.name);
        })
      )
      .subscribe();
  }
}

