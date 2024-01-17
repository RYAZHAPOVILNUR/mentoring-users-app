import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [ CommonModule , ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent {
  @Output()
  filterUserEvent = new EventEmitter<string>();

  form = new FormGroup({
    filter: new FormControl<string>('')
  })

  filterUsers(){
    this.filterUserEvent.emit(this.form.value.filter!);
  }
}
