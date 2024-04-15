import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { setUsersFilter } from '@users/users/data-access';

@Component({
  selector: 'users-filter',
  standalone: true,
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
})
export class UsersFilterComponent {
  public store = inject(Store);

  public formData = new FormGroup({
    name: new FormControl(''),
  });

  public onFilterUsers(): void {
    const value: any = this.formData.value;
    if (value) {
      this.store.dispatch(setUsersFilter(value));
    }
  }
}
