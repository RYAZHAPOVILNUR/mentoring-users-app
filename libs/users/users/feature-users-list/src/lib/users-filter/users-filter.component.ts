import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-users-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent {
  @Output() filterUsers = new EventEmitter<string>();

  @ViewChild('filterInput') filterInput: ElementRef<HTMLInputElement> | undefined;

  public form = new FormGroup({
    filter: new FormControl(''),
  });

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  public ngOnInit(): void {
    this.form.get('filter')?.valueChanges.subscribe((value: string | null) => {
      this.filterUsers.emit(value || '');
      localStorage.setItem('filterUsers', value || '');
    });
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  public ngAfterViewInit(): void {
    const filter = localStorage.getItem('filterUsers');
    if (filter) {
      this.form.get('filter')?.setValue(filter);
    }
  }
}
