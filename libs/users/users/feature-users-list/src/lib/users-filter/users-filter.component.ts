import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersFilterComponent {
  @Output() filter = new EventEmitter();
  private readonly fb = inject(FormBuilder)
  public readonly filterUsers = this.fb.control('', [Validators.required])

  constructor() {
    this.filterUsers.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe((value) => {
      if (value !== null) {
        this.filter.emit(value);
      }
    })
  }
}
