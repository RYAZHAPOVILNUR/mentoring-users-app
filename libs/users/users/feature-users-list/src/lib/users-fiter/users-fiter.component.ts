import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { UsersFacade } from '@users/users/data-access';

@Component({
  selector: 'users-users-filter',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule,MatInputModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent {
  private ara: FormBuilder = inject(FormBuilder);
  private usersFacade = inject(UsersFacade);
  form!: FormGroup;

  constructor() {
    this.form = this.ara.group({
      name: [''],
    });
  }

  filterUsers(): void {
    this.usersFacade.filterUsers(this.form.value);
  }
}
