import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-list-users-filter',
  standalone: true,
  imports: [ CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule ],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent {
    @Output() UserFilter = new EventEmitter()

    filterUsers = new FormControl('', [Validators.required]);

    constructor(){
        console.log('constructor работает');
        this.filterUsers.valueChanges.pipe(
            debounceTime(1000),
            distinctUntilChanged(),
            takeUntilDestroyed()
        ).subscribe(value => {
            console.log('subscribe работает', value);
            if (value !== null){
                console.log('Фильтр работает: value = ', value);
                this.UserFilter.emit(value)
            }
        })
    }
    onDestroy(): void {
        this.UserFilter.emit('');
    }
}

        // через valueChanges слушаем наш FormControl, который возвращает нам Observable, 
        // pipe - это rxJS-oвский оператор, который является контейнером для других операторов, 
        // debounceTime - задержка, 
        // distinctUntilChanged - отменить подписку, 
        // emit - метод, чтобы отправлять значения через @Output
        // 4в. создаем FormControl фильтрации юзеров, и иницилизируем его пустой строкой, связываем его с инпутом через [] в html,
        // и при инициализации компонента подписываемся на FormControl, т.е. поначалу получаем пустую строку, но при
        // изменении-получении через 1 секунду, отправляем значение через Output
        // @Output() - это декоратор, который создает событие отправки данных в родительский компонент (container)