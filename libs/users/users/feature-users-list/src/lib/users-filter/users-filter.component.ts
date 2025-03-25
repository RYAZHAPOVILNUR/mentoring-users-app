import { Component, inject, DestroyRef } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { UsersFacade } from "@users/users/data-access";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class UsersFilterComponent {
  searchControl = new FormControl('');
  private readonly usersFacade = inject(UsersFacade);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.searchControl.valueChanges
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(name => {
      this.usersFacade.setUsersFilter({ name: name || '' });
    });
  }
}