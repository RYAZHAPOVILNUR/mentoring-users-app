import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { UsersFacade } from '@users/users/data-access';

@Component({
  selector: 'users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule],
  standalone: true,
})
export class UsersFilterComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private usersFacade = inject(UsersFacade);
  filterForm!: FormGroup;

  constructor() {
    this.filterForm = this.fb.group({
      name: [''],
    });
  }

  applyFilter(): void {
    this.usersFacade.setUsersFilter(this.filterForm.value);
  }
}
