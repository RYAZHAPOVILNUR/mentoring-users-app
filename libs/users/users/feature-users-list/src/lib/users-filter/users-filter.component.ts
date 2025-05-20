import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'users-filter',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<string>();

  filterControl = new FormControl('');

  ngOnInit() {
    this.filterControl.valueChanges.pipe(debounceTime(300)).subscribe((value) => this.filterChange.emit(value ?? ''));
  }
}
