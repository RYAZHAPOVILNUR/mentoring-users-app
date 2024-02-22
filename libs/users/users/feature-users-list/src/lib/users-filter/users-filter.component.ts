import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UsersFacade } from '@users/users/data-access';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss']
})
export class UsersFilterComponent {
  filterForm = new FormGroup({
    searchText: new FormControl(''), // Предполагаем, что это поле для ввода текста фильтрации
    filterType: new FormControl('user'), // Должно быть инициализировано со значением по умолчанию
  });

  constructor(private usersFacade: UsersFacade) {
    this.filterForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(filterValues => {
      this.applyFilter();
    });
  }

  applyFilter() {
    const { searchText, filterType } = this.filterForm.value;

    if (filterType === 'user') {
      this.usersFacade.setUsersFilter({ name: searchText ?? '' });
    } else if (filterType === 'email') {
      this.usersFacade.setUsersFilter({ email: searchText ?? '' });
    }
  }
}
