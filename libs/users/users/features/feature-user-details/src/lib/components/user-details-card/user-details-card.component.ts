import { NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PushPipe } from '@ngrx/component';
import { map, Observable } from 'rxjs';

import { AddressType } from '@shared/data-access-address';
import { AddressFieldComponent } from '@shared/feature-address-field';
import { LoadingStatus } from '@shared/util-store';
import { Callback } from '@shared/util-typescript';
import { UserEntity } from '@users/shared/data-access-models';
import { EditUserEntity } from '@users/users/data-access-user';

import { UserFormService } from '../../services/user-form.service';

type DetailUsersCardVm = {
  editMode: boolean;
  status: LoadingStatus;
  user: UserEntity | null;
  errors: HttpErrorResponse | null;
};

@Component({
  selector: 'users-detail-users-card',
  standalone: true,
  imports: [
    NgIf,
    PushPipe,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    AddressFieldComponent,
  ],
  templateUrl: './user-details-card.component.html',
  styleUrls: ['./user-details-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsCardComponent {
  private _vm: DetailUsersCardVm = {
    editMode: false,
    user: null,
    status: 'init',
    errors: null,
  };

  private readonly snackBar = inject(MatSnackBar);

  private readonly onEditSuccess: Callback = () =>
    this.snackBar.openFromTemplate(this.snackbarTemplateRef, {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });

  @ViewChild('snackbar', { static: true }) snackbarTemplateRef!: TemplateRef<unknown>;

  readonly form = inject(UserFormService).getUserDetailsForm();

  readonly areFormChanged$ = this.isFormChanged();

  readonly addressTypes = AddressType;

  @Output() userEdit = new EventEmitter<{
    user: EditUserEntity;
    onSuccessCb: Callback;
  }>();

  @Output() userClose = new EventEmitter<void>();
  @Output() userDelete = new EventEmitter<void>();
  @Output() editModeOpen = new EventEmitter<void>();
  @Output() editModeClose = new EventEmitter<void>();

  @Input({ required: true })
  set vm(vm: DetailUsersCardVm) {
    this._vm = vm;

    this.initFormState(vm);
  }

  get vm(): DetailUsersCardVm {
    return this._vm;
  }

  onFormSubmit(): void {
    const { name, email, username, city } = this.form.getRawValue();

    const editedUser: EditUserEntity = {
      ...this.vm.user!,
      name,
      city,
      username,
      email: email.trim().toLowerCase(),
    };

    this.userEdit.emit({
      user: editedUser,
      onSuccessCb: this.onEditSuccess,
    });
  }

  onBackButtonClick(): void {
    this.userClose.emit();
  }

  onCloseButtonClick(): void {
    this.editModeClose.emit();
  }

  onEditButtonClick(): void {
    this.editModeOpen.emit();
  }

  onDeleteButtonClick(): void {
    this.userDelete.emit();
  }

  private initFormState(vm: DetailUsersCardVm): void {
    if (vm.user) {
      this.form.patchValue(vm.user);
    }

    if (vm.editMode) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }

  private isFormChanged(): Observable<boolean> {
    const isFormControlChanged = ([key, control]: [string, FormControl]) =>
      this.vm.user && this.vm.user[key as keyof UserEntity] !== control.value;

    return this.form.valueChanges.pipe(
      map(() => {
        const formEntries = Object.entries(this.form.controls);

        return formEntries.some(isFormControlChanged);
      }),
    );
  }
}
