import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UsersFacade } from '@users/users/data-access';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss']
})
export class UsersFilterComponent implements OnInit {
  private readonly usersFacade = inject(UsersFacade);
  private readonly fb = inject(FormBuilder);
  public readonly filterForm = this.fb.group({ name: [''] });

  @Output() nameFilter = new EventEmitter<string | null>();

  showClearButton = false;

  ngOnInit(): void {
    this.filterForm.get('name')?.valueChanges.subscribe(name => {
      this.usersFacade.setNameFilter({ name: name ?? '' });
      this.showClearButton = (name ?? '').length > 0;
    });
  }

  clearInput() {
    this.filterForm.setValue({ name: '' });
  }
}
