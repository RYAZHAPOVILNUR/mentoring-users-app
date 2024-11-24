import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class UsersFilterComponent {
  store = inject(Store);
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  @Output() filteredUsers = new EventEmitter();

  filterUsers() {
    this.filteredUsers.emit({filter: {name:this.form.value.name}});
  }
}
