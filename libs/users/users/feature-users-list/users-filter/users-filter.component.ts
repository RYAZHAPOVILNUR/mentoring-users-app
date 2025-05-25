import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatError } from '@angular/material/form-field';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { UsersFacade } from '../../data-access/src/lib/+state/users.facade';

@Component({
  selector: 'users-filter',
  templateUrl: './users-filter.components.html',
  styleUrl: './users-filter.component.scss',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatError, ReactiveFormsModule],
})
export class UsersFilterComponent {
  public name = new FormControl('', {
    validators: [Validators.required, Validators.minLength(2)],
  });

  constructor(private readonly usersFacade: UsersFacade) {
    this.name.valueChanges.pipe(filter((value): value is string => value !== null)).subscribe((value) => {
      this.usersFacade.setFilter({ name: value });
    });
  } 
}
 