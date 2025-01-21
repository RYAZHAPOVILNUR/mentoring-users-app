import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UsersFacade } from '@users/users/data-access';
import {distinctUntilChanged } from 'rxjs/operators'; // Изменили импорт


@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [MatInputModule, 
    MatFormFieldModule, 
    FormsModule, 
    ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss']

}
)

export class UsersFilterComponent { 

    inputValue = new FormControl ('');

    constructor(private usersFacade: UsersFacade) {}

  ngOnInit() {
    // Подписываемся на изменения в поле ввода
    this.inputValue.valueChanges
      .pipe(
        distinctUntilChanged() // Отправляем только если значение изменилось
      )
      .subscribe(name => {
        this.usersFacade.setUsersFilter({ name: name || '' });
      });
  }

  }