import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersFacade } from '@users/users/data-access-user';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'users-user-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent implements OnInit {
  private readonly usersFacade = inject(UsersFacade);
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
  });

  ngOnInit(): void {
    this.form.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      const name = value.name ?? '';
      this.usersFacade.filterUsers({ name });
    });
  }
}
