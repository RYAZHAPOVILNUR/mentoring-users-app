import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'users-users-filter',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent {   
  @Output() UserFilter = new EventEmitter();

  filterUsers = new FormControl('',[Validators.required]);

  constructor() {
    this.filterUsers.valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged(),
    ) .subscribe(value => {
      if (value !== null) {
        this.UserFilter.emit({name: value})
      }
      
    })
  }
}
