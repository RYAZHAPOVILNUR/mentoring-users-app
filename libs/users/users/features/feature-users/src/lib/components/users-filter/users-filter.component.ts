import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { debounceTime } from "rxjs";

@Component ({
  selector: 'users-filter',
  standalone: true,
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
  imports : [CommonModule, ReactiveFormsModule,],
})

export class UsersFilterComponent {
  nameControl = new FormControl('');

  @Output() nameFilterChange = new EventEmitter<string>();
  
  constructor() {
    this.nameControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe((value: string | null) => {
        this.nameFilterChange.emit(value ?? '');
      })
  }
}
