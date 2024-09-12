import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent implements OnInit {
  nameControl = new FormControl('', [Validators.required])

  @Output() nameFilter = new EventEmitter<string>()

  ngOnInit(): void {
    this.nameControl.valueChanges.subscribe(value => {
      if (value) {
        this.nameFilter.emit(value)
      }
    })
  }
}
