import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersFacade } from '@users/users/data-access';
import { filter } from 'rxjs';

@Component({
  selector: 'users-filter',
  standalone: true,
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
})
export class UsersFilterComponent {
  public name = new FormControl('', {
    validators: [Validators.required, Validators.minLength(2)],
  });

  constructor(private readonly usersFacade: UsersFacade) {
    this.name.valueChanges.pipe(filter((value): value is string => value !== null)).subscribe((value) => {
      this.usersFacade.setUsersFilter({ name: value });
    });
  }
}
