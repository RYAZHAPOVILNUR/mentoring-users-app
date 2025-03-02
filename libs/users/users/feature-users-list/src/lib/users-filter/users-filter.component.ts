import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersFacade } from '@users/users/data-access';
import { debounceTime, startWith, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent implements OnInit, OnDestroy {
  private readonly usersFacade = inject(UsersFacade);
  private readonly inputSubject = new Subject<string>();
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.inputSubject.pipe(startWith(''), debounceTime(300), takeUntil(this.destroy$)).subscribe((inputText) => {
      this.usersFacade.setFilterUsers(inputText || '');
    });
  }

  onInputChange(inputText: string): void {
    this.inputSubject.next(inputText);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
