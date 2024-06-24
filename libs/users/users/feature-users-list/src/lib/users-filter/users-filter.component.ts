import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersFacade } from '@users/users/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-users-filter',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFilterComponent {
  private readonly userFacade = inject(UsersFacade);
  private readonly destroyRef = inject(DestroyRef);
  
  public readonly name = new FormControl<string>('', { nonNullable: true });

  public filterName() {
    this.name.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(name => this.userFacade.filterName(name));
  }

  public clearInput() {
    this.name.reset();
  }
}


