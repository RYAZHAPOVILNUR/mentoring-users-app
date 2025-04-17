import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsersFacade } from '@users/users/data-access';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UsersFilterComponent implements OnInit, OnDestroy {

  public nameControl = new FormControl<string>('', { nonNullable: true });

  private usersFacade = inject(UsersFacade);

  public readonly filteredUsers$ = this.usersFacade.filteredUsers$;

  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.nameControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(name => {
      this.usersFacade.setFilter(name);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
