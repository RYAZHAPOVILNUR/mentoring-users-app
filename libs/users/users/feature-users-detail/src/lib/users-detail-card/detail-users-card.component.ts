/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { onSuccessEditionCbType } from '@users/users/data-access';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { DetailUsersCardVm } from './detail-users-card-vm';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateUserDTO, UsersEntity } from '@users/core/data-access';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DadataApiService } from '@dadata';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { PushPipe } from '@ngrx/component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'detail-users-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    PushPipe,
    AsyncPipe,
  ],
  templateUrl: './detail-users-card.component.html',
  styleUrls: ['./detail-users-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailUsersCardComponent implements OnInit {
  @Output() readonly editUser = new EventEmitter<{
    user: CreateUserDTO;
    onSuccessCb: onSuccessEditionCbType;
  }>();
  @Output() readonly closeUser = new EventEmitter();
  @Output() readonly closeEditMode = new EventEmitter();
  @Output() readonly openEditMode = new EventEmitter();
  @Output() readonly deleteUser = new EventEmitter();

  @Input({ required: true })
  set vm(vm: DetailUsersCardVm) {
    this._vm = vm;

    if (vm.user) {
      this.formGroup.patchValue({
        name: vm.user.name,
        email: vm.user.email,
        username: vm.user.username,
        city: vm.user.city,
        totalStoryPoints: vm.user.totalStoryPoints,
      });
    }

    if (vm.editMode) {
      this.formGroup.enable();
    } else {
      this.formGroup.disable();
    }
  }

  @ViewChild('snackbar') readonly snackbarTemplateRef!: TemplateRef<any>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly dadata = inject(DadataApiService);
  private readonly snackBar = inject(MatSnackBar);

  private _vm: DetailUsersCardVm = {
    editMode: false,
    user: null,
    status: 'init',
    errors: null,
  };

  public readonly areFieldsChanged$ = new BehaviorSubject<boolean>(false);
  public readonly isStoryPointsDisabled$ = new BehaviorSubject<boolean>(true);

  public readonly formGroup = new FormBuilder().group({
    name: new FormControl({ value: '', disabled: !this.vm.editMode }, [Validators.required]),
    email: new FormControl({ value: '', disabled: !this.vm.editMode }, [Validators.required, Validators.email]),
    username: new FormControl({ value: '', disabled: !this.vm.editMode }),
    city: new FormControl({ value: '', disabled: !this.vm.editMode }),
    totalStoryPoints: new FormControl({ value: 0, disabled: !this.vm.editMode }),
  });

  public readonly citySuggestions = this.formGroup.controls.city.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    filter(Boolean),
    switchMap((value) => this.dadata.getCities(value)),
  );

  public get vm() {
    return this._vm;
  }

  ngOnInit(): void {
    this.checkChangeFields();
  }

  private checkChangeFields() {
    this.formGroup.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => {
          const formEntries = Object.entries(this.formGroup.controls);
          const isFormControlChanged = (key: string, control: FormControl) =>
            this.vm.user && this.vm.user[key as keyof UsersEntity] !== control.value;

          const isFieldChanged = formEntries.some(([key, control]) => isFormControlChanged(key, control));

          this.areFieldsChanged$.next(isFieldChanged);
        }),
      )
      .subscribe();
  }

  private onEditSuccess: onSuccessEditionCbType = () =>
    this.snackBar.openFromTemplate(this.snackbarTemplateRef, {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });

  public onSubmit(): void {
    this.disableStoryPointsField();

    this.editUser.emit({
      user: {
        name: this.formGroup.getRawValue().name || '',
        username: this.formGroup.getRawValue().username || '',
        city: this.formGroup.getRawValue().city || '',
        email: this.formGroup.getRawValue().email?.trim().toLowerCase() || '',
        purchaseDate: new Date().toString() || '',
        educationStatus: 'trainee',
        totalStoryPoints: this.formGroup.getRawValue().totalStoryPoints || 0,
      },
      onSuccessCb: this.onEditSuccess,
    });
  }

  public onCloseUser() {
    this.closeUser.emit();
  }

  public onCloseEditMode() {
    this.closeEditMode.emit();
  }

  public onOpenEditMode() {
    this.openEditMode.emit();
  }

  public onDeleteUser() {
    this.deleteUser.emit();
  }

  public onOptionClicked(selectedValue: string) {
    this.formGroup.get('city')?.setValue(selectedValue);
  }

  public enableStoryPointsField() {
    this.formGroup.get('totalStoryPoints')?.enable();
    this.isStoryPointsDisabled$.next(false);
  }

  public disableStoryPointsField() {
    this.formGroup.get('totalStoryPoints')?.disable();
    this.isStoryPointsDisabled$.next(true);
  }
}
