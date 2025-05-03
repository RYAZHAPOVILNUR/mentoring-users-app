import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'users-user-filter',
  templateUrl: './user-list-filter.component.html',
  styleUrls: ['./user-list-filter.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
})
export class UserListFilterComponent {
  FormGroup = new FormGroup({
    name: new FormControl(''), // Поле для фильтрации по имени
  });
  
  @Output()
  emitFormName = new EventEmitter<string>();

  emitFormNameHandler() {
    console.log('Фильтр отправлен:', this.FormGroup.value.name);
    this.emitFormName.emit(this.FormGroup.get('name')?.value || '')
  }
}