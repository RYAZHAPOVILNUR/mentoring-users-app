import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersFacade } from '@users/users/data-access';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'users-filter',
  standalone: true,
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatFormFieldModule],
})
export class UsersFilterComponent {
  readonly usersFacade$ = inject(UsersFacade);

  form = new FormGroup({
    nameControl: new FormControl(''),
  });

  applyFilter(): void {
    const name = this.form.get('nameControl')?.value?.trim() || '';
    this.usersFacade$.filterUsers({ name });
  }
}
