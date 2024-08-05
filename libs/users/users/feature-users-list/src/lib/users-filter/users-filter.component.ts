import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UsersFilterComponent {
  private readonly fb = inject(FormBuilder)
  public readonly filterUsers = this.fb.control('', [Validators.required])

  @Output() filter = new EventEmitter();
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
