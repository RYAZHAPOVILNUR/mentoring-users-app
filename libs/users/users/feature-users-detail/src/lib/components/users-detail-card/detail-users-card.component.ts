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
import { onSuccessEditionCbType } from '@users/users/data-access';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { DetailUsersCardVm } from './detail-users-card-vm';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateUserDTO, UsersDTO } from '@users/core/data-access';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DadataApiService } from '@dadata';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs';
import { PushPipe } from '@ngrx/component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UsersStoryPointComponent } from '../users-story-point/users-story-point.component';

type UserCardForm = Pick<UsersDTO, 'city' | 'name' | 'email' | 'username' | 'totalStoryPoints'>

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
    UsersStoryPointComponent
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
      const { name, email, username, city } = vm.user;
      this.formGroup.patchValue({ name, email, username, city });
    }

    if (vm.editMode) {
      this.formGroup.enable();
    } else {
      this.formGroup.disable();
    }
  }

  private readonly fb = inject(FormBuilder);
  public formGroup = this.fb.nonNullable.group({
    name: [{ value: '', disabled: !this.vm.editMode }, [Validators.required]],
    email: [{ value: '', disabled: !this.vm.editMode }, [Validators.required, Validators.email]],
    username: [{ value: '', disabled: !this.vm.editMode }],
    city: [{ value: '', disabled: !this.vm.editMode }]
  });

  @Output() editUser = new EventEmitter<{
    user: CreateUserDTO;
    onSuccessCb: onSuccessEditionCbType;
  }>();
  @Output() closeUser = new EventEmitter();
  @Output() closeEditMode = new EventEmitter();
  @Output() openEditMode = new EventEmitter();
  @Output() deleteUser = new EventEmitter();
  @Output() editStoryPoints = new EventEmitter<{
    totalStoryPoints: number,
    onSuccessCb: onSuccessEditionCbType;
  }>();

  @ViewChild('snackbar') snackbarTemplateRef!: TemplateRef<any>;
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

  onSubmit(): void {
    this.editUser.emit({
      user: {
        name: this.formGroup.value.name || '',
        username: this.formGroup.value.username || '',
        city: this.formGroup.value.city || '',
        email: this.formGroup.value.email?.trim().toLowerCase() || '',
        purchaseDate: new Date().toString() || '',
        educationStatus: 'trainee',
      },
      onSuccessCb: this.onEditSuccess
    });
  }

  emitStoryPoint(storyPoint: number): void {
    this.editStoryPoints.emit({ totalStoryPoints: storyPoint, onSuccessCb: this.onEditSuccess });
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
    type formKeys = keyof UserCardForm
    this.formGroup.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(() => Object.entries(this.formGroup.controls)),
        tap((formControlInfo) => {
          const isFormControlChanged = (key: string, control: FormControl) =>
            this.vm.user && this.vm.user[key as formKeys] !== control.value;

          const isFieldChanged = formControlInfo.some(([key,
                                                         control
                                                       ]) => isFormControlChanged(key, control));

          this.areFieldsChanged$.next(isFieldChanged);
        })
      )
      .subscribe();
  }
}
