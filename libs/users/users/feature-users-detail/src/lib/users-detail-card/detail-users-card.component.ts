import {
  Input,
  inject,
  OnInit,
  Output,
  Component,
  ViewChild,
  DestroyRef,
  TemplateRef,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  tap,
  filter,
  switchMap,
  debounceTime,
  BehaviorSubject,
  distinctUntilChanged,
} from 'rxjs';
import { DadataApiService } from '@dadata';
import { PushPipe } from '@ngrx/component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DetailUsersCardVm } from './detail-users-card-vm';
import { CommonModule, NgIfContext } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { onSuccessEditionCbType } from '@users/users/data-access';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateUserDTO, UsersEntity } from '@users/core/data-access';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'detail-users-card',
  standalone: true,
  imports: [
    PushPipe,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatAutocompleteModule,
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
  error!: TemplateRef<NgIfContext<boolean>> | null;
  public get vm() {
    return this._vm;
  }
  @Input({ required: true })
  set vm(vm: DetailUsersCardVm) {
    this._vm = vm;

    if (vm.user) {
      this.formGroup.patchValue({
        name: vm.user.name,
        city: vm.user.city,
        email: vm.user.email,
        username: vm.user.username,
      });
      this.totalStoryPoints.setValue(vm.user.totalStoryPoints)
    }

    if (vm.editMode) {
      this.formGroup.enable();
    } else {
      this.formGroup.disable();
    }
  }
  
  public formGroup = new FormBuilder().group({
    city: new FormControl({ value: '', disabled: !this.vm.editMode }),
    username: new FormControl({ value: '', disabled: !this.vm.editMode }),
    name: new FormControl({ value: '', disabled: !this.vm.editMode }, [Validators.required]),
    email: new FormControl({ value: '', disabled: !this.vm.editMode }, [Validators.required, Validators.email]),
  });
  public totalStoryPoints = new FormControl({value: this.vm.user?.totalStoryPoints, disabled: true});

  public citySuggestions = this.formGroup.controls.city.valueChanges.pipe(
    filter(Boolean),
    debounceTime(200),
    distinctUntilChanged(),
    switchMap((value) => this.dadata.getCities(value))
  );
  
  @Output() closeUser = new EventEmitter();
  @Output() deleteUser = new EventEmitter();
  @Output() openEditMode = new EventEmitter();
  @Output() closeEditMode = new EventEmitter();
  @Output() editUser = new EventEmitter<{ user: CreateUserDTO, onSuccessCb: onSuccessEditionCbType }>();
  @Output() addStoryPoints = new EventEmitter<{ user: CreateUserDTO, onSuccessAddSP: onSuccessEditionCbType }>
  @ViewChild('snackbar') snackbarTemplateRef!: TemplateRef<string>;
  @ViewChild('snackbarSP') snackbarTemplateRefSP!: TemplateRef<string>;

  public areFieldsChanged$ = new BehaviorSubject<boolean>(false);
  
  private snackBar = inject(MatSnackBar);
  private dadata = inject(DadataApiService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.checkChangeFields();
  }

  private onEditSuccess: onSuccessEditionCbType = () =>
    this.snackBar.openFromTemplate(this.snackbarTemplateRef, {
      duration: 1000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });

  private onSuccessAddSP: onSuccessEditionCbType = () =>
    this.snackBar.openFromTemplate(this.snackbarTemplateRefSP, {
      duration: 1000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });

  onAddStoryPoints(): void {
    this.totalStoryPoints.disable();
    this.addStoryPoints.emit({
      user: {
        name: this.formGroup.value.name || '',
        email: this.formGroup.value.email?.trim().toLowerCase() || '',
        totalStoryPoints: this.totalStoryPoints.value || 0,
      },
      onSuccessAddSP: this.onSuccessAddSP,
    })
  }

  onSubmit(): void {
    this.editUser.emit({
      user: {
        educationStatus: 'trainee',
        name: this.formGroup.value.name || '',
        city: this.formGroup.value.city || '',
        purchaseDate: new Date().toString() || '',
        username: this.formGroup.value.username || '',
        email: this.formGroup.value.email?.trim().toLowerCase() || '',
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
