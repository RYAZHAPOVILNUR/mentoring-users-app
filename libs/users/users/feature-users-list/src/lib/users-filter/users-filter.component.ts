import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UsersFacade } from '@users/users/data-access';

@Component({
  selector: 'users-users-filter',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent {
  private readonly usersFacade = inject(UsersFacade);

  public form = new FormGroup({
    usersFilter: new FormGroup({
      name: new FormControl(''),
    }),
  });

  applyFilter(): void {
    const name = this.form.get('usersFilter.name')?.value?.trim() || '';
    this.usersFacade.userFilter(name);
  }
}
