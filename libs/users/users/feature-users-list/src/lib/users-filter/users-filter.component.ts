import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersFacade } from '@users/users/data-access';

@Component({
  selector: 'users-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersFilterComponent {
  private readonly userFacade = inject(UsersFacade);
  private readonly fb = inject(FormBuilder);
  public readonly filterFormGroup = this.fb.group({
    name: '',
  });

  public filterUsersByName(): void {
    this.userFacade.filterUsers(this.filterFormGroup.controls.name.value as string);
  }

}
