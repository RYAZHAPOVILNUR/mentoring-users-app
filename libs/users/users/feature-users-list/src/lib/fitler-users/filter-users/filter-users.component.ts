import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule,} from '@ngx-translate/core';

@Component({
  selector: 'users-filter-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule, TranslateModule],
  templateUrl: './filter-users.component.html',
  styleUrls: ['./filter-users.component.scss'],
})
export class FilterUsersComponent {
  @Output() filterUsers = new EventEmitter()

  public filteredField = new FormControl('')

  public onFilterUsers() {
    this.filterUsers.emit(this.filteredField.value)
  }
}