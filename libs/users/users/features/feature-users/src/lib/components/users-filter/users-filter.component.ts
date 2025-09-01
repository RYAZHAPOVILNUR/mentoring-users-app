import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UsersFacade } from '@users/users/data-access-user';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  standalone: true,
})
export class UsersFilterComponent implements OnInit {
  public name = new FormControl('', Validators.required);
  private userFacade: UsersFacade = inject(UsersFacade);

  ngOnInit() {
  this.name.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe(value => {
      if (value) {
        this.userFacade.setUsersFilter(value.trim());
      }
    });
}
}