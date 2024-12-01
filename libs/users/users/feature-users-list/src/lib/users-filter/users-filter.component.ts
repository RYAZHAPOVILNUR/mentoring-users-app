import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['users-filter.component.scss'],
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  standalone: true,
})
export class UsersFilterComponent implements OnInit {
  nameControl = new FormControl('');

  @Output() filterChanged = new EventEmitter<string>();

  ngOnInit(){
    this.nameControl.valueChanges.subscribe((value: never | any | unknown) => {
      this.filterChanged.emit(value);
    });
  }
}
