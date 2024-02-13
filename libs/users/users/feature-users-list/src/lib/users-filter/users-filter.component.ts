import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UsersFacade } from '@users/users/data-access';

@Component({
  selector: 'users-users-filter',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent {
  private readonly formBuilder = inject(FormBuilder);
  public form: FormGroup = this.formBuilder.group({
      email: ['']
    }
  );
  private readonly usersFacade = inject(UsersFacade);

  public onUsersFilter(): void {
    this.usersFacade.setUsersFilter(this.form.get('email')?.value)
  }
}
