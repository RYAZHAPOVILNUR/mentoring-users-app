import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';

import { UserEntity } from '@users/shared/data-access-models';
import * as UsersActions from '@users/users/state/users.actions';
import { UsersState } from '@users/users/state/users.reducer';
import { selectOpenedUser } from '@users/users/state/users.selectors';

@Component({
  selector: 'users-edit-storypoints',
  templateUrl: './edit-storypoints.component.html',
  styleUrls: ['./edit-storypoints.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class EditStorypointsComponent {
  private readonly store = inject<Store<UsersState>>(Store);
  private readonly snackBar = inject(MatSnackBar);

  private openedUserId: number | null = null;
  public editing = false;

  public formgroup = new FormGroup({
    totalStoryPoints: new FormControl<number | null>({ value: null, disabled: true }, [
      Validators.required,
      Validators.min(0),
      Validators.pattern(/^\d+$/),
    ]),
  });

  constructor() {
    this.store
      .select(selectOpenedUser)
      .pipe(filter((u): u is UserEntity => !!u))
      .subscribe((user) => {
        this.openedUserId = user.id;
        if (!this.editing) {
          this.totalStoryPointsControl.setValue(user.totalStoryPoints ?? 0);
          this.totalStoryPointsControl.disable();
        }
      });
  }
  get totalStoryPointsControl(): FormControl<number | null> {
    return this.formgroup.get('totalStoryPoints') as FormControl<number | null>;
  }

  startEditing() {
    this.editing = true;
    this.totalStoryPointsControl.enable();
  }

  confirm() {
    if (!this.formgroup.valid || this.openedUserId === null) return;

    const points = this.totalStoryPointsControl.value!;
    this.store.dispatch(UsersActions.updateStoryPoints({ id: this.openedUserId, totalStoryPoints: points }));

    this.editing = false;
    this.totalStoryPointsControl.disable();

    this.snackBar.open('Сторипоинты сохранены', 'Закрыть', { duration: 3000 });
  }

  cancel() {
    this.editing = false;
    if (this.openedUserId !== null) {
      this.store
        .select(selectOpenedUser)
        .pipe(filter((u): u is UserEntity => !!u))
        .subscribe((user) => {
          this.totalStoryPointsControl.setValue(user.totalStoryPoints ?? 0);
          this.totalStoryPointsControl.disable();
        })
        .unsubscribe();
    }
  }
}
