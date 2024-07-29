import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersFacade } from '@users/users/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly usersFacade = inject(UsersFacade);
  public usersFilterForm = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
  });

  ngOnInit(): void {
    this.usersFacade.usersFilter$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((filter) => {
      this.usersFilterForm.patchValue({ name: filter.name });
    });
  }

  setUsersFilter() {
    this.usersFacade.setUsersFilter(<string>this.usersFilterForm.value.name?.trim());
  }
}
