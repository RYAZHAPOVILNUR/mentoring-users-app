import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersFacade } from '@users/users/data-access';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'users-filter',
  standalone: true,
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatButtonModule],
})
export class UsersFilterComponent {
  public inputName = new FormControl('');
  private destroy$ = new Subject<void>();

  constructor(private usersFacade: UsersFacade) {}

  ngOnInit() {
    this.inputName.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((name) => {
        this.usersFacade.usersFilter({ name: name || '' });
      });
  }
}
