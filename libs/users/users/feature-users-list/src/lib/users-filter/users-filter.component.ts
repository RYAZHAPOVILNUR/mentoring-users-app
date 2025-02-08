import {Component, EventEmitter, Output} from '@angular/core'
import {MatInputModule} from '@angular/material/input'
import {FormControl, ReactiveFormsModule} from '@angular/forms'
import {debounceTime, tap} from 'rxjs'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'

@Component({
  selector: 'users-filter',
  templateUrl: 'users-filter.component.html',
  styleUrls: ['users-filter.component.scss'],
  imports: [
    MatInputModule,
    ReactiveFormsModule
  ],
  standalone: true
})
export class UsersFilterComponent {
  readonly name = new FormControl('', {nonNullable: true})
  @Output() searchInput = new EventEmitter<string>();

  constructor() {
    this.subscribeToNameValueChanges();
  }

  private subscribeToNameValueChanges(): void {
    this.name.valueChanges
      .pipe(
        debounceTime(300),
        tap(value => this.searchInput.emit(value)),
        takeUntilDestroyed()
      )
      .subscribe()
  }
}
