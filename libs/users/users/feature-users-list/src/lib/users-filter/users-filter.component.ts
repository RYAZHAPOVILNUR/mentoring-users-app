import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersFacade } from '@users/users/data-access';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UsersFilterComponent {
  private readonly usersFacade = inject(UsersFacade);
  public nameFilter = new FormControl('');

  constructor() {
    this.nameFilter.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((name) => {
      this.usersFacade.setFilter(name || '');
    });
  }
}
