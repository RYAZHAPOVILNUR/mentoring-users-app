import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UsersFacade } from '@users/users/data-access';
import { filter } from 'rxjs';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, FormsModule, MatInputModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent {
  public readonly filterFormControl = new FormControl('');
  private readonly usersFacade = inject(UsersFacade);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.filterFormControl.valueChanges
      .pipe(
        filter((value): value is string => value !== null),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((value) => this.usersFacade.filterUsers({ name: value }));
  }
}
