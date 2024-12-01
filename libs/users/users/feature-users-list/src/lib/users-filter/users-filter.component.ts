import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent {
  private readonly fb = inject(FormBuilder);
  public readonly filterUsers = this.fb.control('', [Validators.required]);

  @Output() filt = new EventEmitter();
  constructor() {
    this.filterUsers.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe((value) => {
      if (value !== null) {
        this.filt.emit(value);
      }
    });
  }
}