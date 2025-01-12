import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setUsersFilter } from 'libs/users/users/data-access/src/lib/+state/users.actions';

// export interface Filter {
//   name: string | undefined;
// }

@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
})
export class UsersFilterComponent {
  private readonly store = inject(Store);
  
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  submitFormUser() {
    const name = this.form.value.name;
    this.store.dispatch(setUsersFilter({ filter: { name } }));
  }
}
