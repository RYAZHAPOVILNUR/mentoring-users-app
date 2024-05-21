import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, fromEvent } from 'rxjs';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent {


  onFilterChanged(event: Event) {
    const target = event.target as HTMLInputElement;

    fromEvent(target, 'input')
      .pipe(
        debounceTime(500)
      )
      .subscribe(() => {
        if (target.value.trim() === '') {
          console.log('пусто');
          //здесь будет получение всех пользователей как было
        }
        else console.log(target.value);
        // тут мы выведем отфильтрованных пользователей
      });
  }


}
