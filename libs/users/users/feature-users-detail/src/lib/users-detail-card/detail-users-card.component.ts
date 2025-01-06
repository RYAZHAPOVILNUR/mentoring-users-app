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
import { CommonModule } from '@angular/common';
import { onSuccessEditionCbType, onSuccessSPonCbType } from '@users/users/data-access';
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
  ],
  templateUrl: './detail-users-card.component.html',
  styleUrls: ['./detail-users-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailUsersCardComponent implements OnInit {
  private _vm: DetailUsersCardVm = {
    editMode: false,
    user: null,
    status: 'init',
    errors: null,
  };
  public get vm() {
    return this._vm;
  }

  @Input({ required: true })
  set vm(vm: DetailUsersCardVm) {
    this._vm = vm;

    if (vm.user) {
      this.formGroup.patchValue({
        name: vm.user.name,
        email: vm.user.email,
        username: vm.user.username,
        city: vm.user.city,
      });
      this.totalStoryPoints.setValue(vm.user.totalStoryPoints ?? 0);
    }

    if (vm.editMode) {
      this.formGroup.enable();
    } else {
      this.formGroup.disable();
    }

    this.isStoryPointEnable$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      if (value) {
        this.totalStoryPoints.enable();
      } else {
        this.totalStoryPoints.disable();
      }
    });
  }

  private isStoryPointEnableSubject$ = new BehaviorSubject<boolean>(false);
  public isStoryPointEnable$ = this.isStoryPointEnableSubject$.asObservable();

  public resetStoryPoints(reset = false) {
    this.isStoryPointEnableSubject$.next(!this.isStoryPointEnableSubject$.value);
    if (reset) {
      this.totalStoryPoints.reset();
      this.totalStoryPoints.setValue(this.vm.user?.totalStoryPoints ?? 0);
    }
  }

  public onStoryPointClose() {
    this.resetStoryPoints(true);
  }

  public onStoryPointSubmit() {
    const isStoryPointsEqual =
      Number(this.totalStoryPoints.value) === Number(this.vm.user?.totalStoryPoints) || this.vm.editMode;
    if (isStoryPointsEqual) {
      this.resetStoryPoints();
    } else {
      this.onAddStoryPoints();
      this.resetStoryPoints(true);
    }
  }

  public formGroup = new FormBuilder().group({
    name: new FormControl(
      {
        value: '',
        disabled: !this.vm.editMode,
      },
      [Validators.required]
    ),
    email: new FormControl(
      {
        value: '',
        disabled: !this.vm.editMode,
      },
      [Validators.required, Validators.email]
    ),
    username: new FormControl({ value: '', disabled: !this.vm.editMode }),
    city: new FormControl({ value: '', disabled: !this.vm.editMode }),
  });

  public totalStoryPoints = new FormControl<number>(
    {
      value: this.vm.user?.totalStoryPoints ?? 0,
      disabled: !this.vm.editMode,
    },
    {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^(0|[1-9][0-9]*)$/), Validators.maxLength(3)],
    }
  );

  @Output() editUser = new EventEmitter<{
    user: CreateUserDTO;
    onSuccessCb: onSuccessEditionCbType;
  }>();
  @Output() addStoryPoints = new EventEmitter<{
    user: CreateUserDTO;
    onSuccessAddSP: onSuccessSPonCbType;
  }>();
  @Output() closeUser = new EventEmitter();
  @Output() closeEditMode = new EventEmitter();
  @Output() openEditMode = new EventEmitter();
  @Output() deleteUser = new EventEmitter();
  @ViewChild('snackbar') snackbarTemplateRef!: TemplateRef<any>;
  @ViewChild('snackbarStoryPoints') snackbarStoryPointsTemplateRef!: TemplateRef<any>;
  private dadata = inject(DadataApiService);
  public citySuggestions = this.formGroup.controls.city.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    filter(Boolean),
    switchMap((value) => this.dadata.getCities(value))
  );

  private snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);
  public areFieldsChanged$ = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    this.checkChangeFields();
  }

  private onEditSuccess: onSuccessEditionCbType = () =>
    this.snackBar.openFromTemplate(this.snackbarTemplateRef, {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });

  private onAddSPSuccess: onSuccessSPonCbType = () =>
    this.snackBar.openFromTemplate(this.snackbarStoryPointsTemplateRef, {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });

  private onAddStoryPoints(): void {
    this.addStoryPoints.emit({
      user: {
        name: this.formGroup.getRawValue().name || '',
        email: this.formGroup.getRawValue().email?.trim().toLowerCase() || '',
        totalStoryPoints: this.totalStoryPoints.getRawValue() || 0,
        purchaseDate: new Date().toString() || '',
        educationStatus: 'trainee',
      },
      onSuccessAddSP: this.onAddSPSuccess,
    });
  }

  public onSubmit(): void {
    this.editUser.emit({
      user: {
        name: this.formGroup.getRawValue().name || '',
        username: this.formGroup.getRawValue().username || '',
        city: this.formGroup.getRawValue().city || '',
        email: this.formGroup.getRawValue().email?.trim().toLowerCase() || '',
        purchaseDate: new Date().toString() || '',
        educationStatus: 'trainee',
      },
      onSuccessCb: this.onEditSuccess,
    });
  }

  onCloseUser() {
    this.closeUser.emit();
  }

  onCloseEditMode() {
    this.closeEditMode.emit();
  }

  onOpenEditMode() {
    this.openEditMode.emit();
  }

  onDeleteUser() {
    this.deleteUser.emit();
  }

  public onOptionClicked(selectedValue: string) {
    this.formGroup.get('city')?.setValue(selectedValue);
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
        })
      )
      .subscribe();
  }
}
