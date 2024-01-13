import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'users-users-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
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
    // console.log('filterUsers: ', this.form.value.filter);
    this.filterUserEvent.emit(this.form.value.filter!);
  }
}
