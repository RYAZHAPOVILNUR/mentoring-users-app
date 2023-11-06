import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-filter-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './filter-users.component.html',
  styleUrls: ['./filter-users.component.scss'],
})
export class FilterUsersComponent {
  @Output() filterUsers = new EventEmitter();
  public filterUsersControl: FormControl = new FormControl('');

  onFilterUsers() {
    this.filterUsers.emit(this.filterUsersControl.value);
  }
}
