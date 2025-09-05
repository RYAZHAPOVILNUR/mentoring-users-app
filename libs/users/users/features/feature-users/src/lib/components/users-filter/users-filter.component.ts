import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'users-filter',
  standalone: true,
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
  imports: [CommonModule, ReactiveFormsModule],
})
export class UsersFilterComponent {
  nameControl = new FormControl('', { nonNullable: true });

  @Output() nameFilterChange = new EventEmitter<string>();

  constructor() {
    this.nameControl.valueChanges.pipe(debounceTime(200), takeUntilDestroyed()).subscribe((value: string | null) => {
      this.nameFilterChange.emit(value ?? '');
    });
  }
}
