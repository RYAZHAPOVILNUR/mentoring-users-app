import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UsersFacade } from '@users/users/data-access';
import { debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatInputModule, ReactiveFormsModule, FormsModule],
  providers: [],
})
export class UsersFilterComponent implements OnInit, OnDestroy {
  readonly filterUser = new FormControl('');
  readonly userFacade = inject(UsersFacade);
  valueChanges!: Subscription;

  ngOnInit(): void {
    this.valueChanges = this.filterUser.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      value ? this.userFacade.filteredUser(value) : '';
    });
  }

  ngOnDestroy() {
    this.valueChanges.unsubscribe();
    this.userFacade.filteredUser('');
  }
}
