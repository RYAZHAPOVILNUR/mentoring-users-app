import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersFacade } from '@users/users/data-access';

@Component({
  selector: 'users-users-filter',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent {

  private usersFacade = inject(UsersFacade);
  public filterName = new FormControl<string>('', [
    Validators.required, // обязательное поле
    // Validators.minLength(0), // минимальная длина
    // Validators.maxLength(50), // максимальная длина
    // Validators.pattern(/^[a-zA-Z]+$/), // паттерн ввода (только буквы)
  ]);

  onFilterName() {
    if (this.filterName.valid && this.filterName.value) {
      this.usersFacade.setFilterUsers(this.filterName.value);
    } else {
      this.usersFacade.setFilterUsers('');
    }

  }

}
