import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UsersFacade } from '@users/users/data-access';
import { debounceTime, startWith, Subject } from 'rxjs';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent implements OnInit {
  private readonly usersFacade = inject(UsersFacade);
  private readonly inputSubject = new Subject<string>();

  ngOnInit(): void {
    this.inputSubject.pipe(startWith(''), debounceTime(300)).subscribe((inputText) => {
      this.usersFacade.setFilterUsers(inputText || '');
    });
  }

  onInputChange(inputText: string): void {
    this.inputSubject.next(inputText);
  }
}
