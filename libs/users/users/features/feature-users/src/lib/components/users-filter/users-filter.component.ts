import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserListContainerStore } from '../../pages/user-list-container/user-list-container.store';
import { debounceTime, Subscription } from 'rxjs';
import { UsersFacade } from '@users/users/data-access-user';

@Component({
  selector: 'users-user-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent implements OnDestroy {
  private readonly componentStore = inject(UserListContainerStore);

  public readonly users$ = this.componentStore.users$;

  private readonly usersFacade = inject(UsersFacade);

  fb = inject(FormBuilder);

  searchFormSub!: Subscription;

  form = this.fb.group({
    name: ['', Validators.required],
  });

  constructor() {
    // this.users$.subscribe(users => {
    //     console.log(users)
    // })
    this.searchFormSub = this.form.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      const name = value.name ?? '';
      return this.usersFacade.filterUsers({ name });
    });
  }

  ngOnDestroy(): void {
    this.searchFormSub.unsubscribe();
  }
}
