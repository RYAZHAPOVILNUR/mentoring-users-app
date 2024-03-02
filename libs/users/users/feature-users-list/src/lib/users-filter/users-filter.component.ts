import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { UsersFilter } from '@users/core/data-access';

@Component({
  selector: 'users-filter',
  standalone: true,
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class UsersFilterComponent {
  private readonly formBuilder = inject(FormBuilder);

  @Output() applySearch = new EventEmitter<UsersFilter>();

  public readonly formGroup = this.formBuilder.group({
    name: new FormControl(''),
  });

  public onApplySearch(): void {
    const filterData = {
      name: this.formGroup.value.name?.toLowerCase(),
    } as UsersFilter;

    this.applySearch.emit(filterData);
  }
}
