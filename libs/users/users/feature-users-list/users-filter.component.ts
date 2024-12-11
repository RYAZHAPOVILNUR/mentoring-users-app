import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: 'users-filter.component.html',
  styleUrls: ['users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent  {
  name = new FormControl('');
  @Output() filterUsers = new EventEmitter();

  constructor() { this.name.valueChanges.pipe( debounceTime(200) ).subscribe(value => { this.filterUsers.emit(value); }); }
}
