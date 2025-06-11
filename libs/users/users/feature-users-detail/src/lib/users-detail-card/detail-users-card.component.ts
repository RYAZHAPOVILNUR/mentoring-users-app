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
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  DetailUsersCardVm,
  EditParams,
  INITIAL_USER_CONFIG,
  QueryParamsConfig
} from './detail-users-card-vm';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UsersEntity } from '@users/core/data-access';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DadataApiService } from '@dadata';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { PushPipe } from '@ngrx/component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const SNACK_BAR_CONFIG: MatSnackBarConfig = {
  duration: 2500,
  horizontalPosition: 'center',
  verticalPosition: 'top',
}

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
  private snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);
  private dadata = inject(DadataApiService);
  @ViewChild('snackbarUserAdded') userAddedTemplateRef!: TemplateRef<any>;
  @ViewChild('snackbarPointsAdded') pointsAddedTemplateRef!: TemplateRef<any>;
  @Output() closeUser = new EventEmitter();
  @Output() closeEditMode = new EventEmitter();
  @Output() openEditMode = new EventEmitter<QueryParamsConfig>();
  @Output() deleteUser = new EventEmitter();
  @Output() editUser = new EventEmitter<EditParams>();
  @Output() editPoints = new EventEmitter<EditParams>();

  private _vm: DetailUsersCardVm = INITIAL_USER_CONFIG;

  public get vm() {
    return this._vm;
  }

  @Input({ required: true })
  set vm(vm: DetailUsersCardVm) {
    this._vm = vm;

    if (vm.user) {
      this.formGroup.patchValue(vm.user);
    }

    if (vm.isEditUser) {
      this.formGroup.enable();
    } else if(vm.isEditPoints) {
      this.formGroup.controls.totalStoryPoints.enable();
    } else {
      this.formGroup.disable();
    }
  }

  protected formGroup = new FormBuilder().group({
    name: new FormControl({ value: '', disabled: !this.vm.isEditUser }, [Validators.required]),
    email: new FormControl({ value: '', disabled: !this.vm.isEditUser }, [Validators.required, Validators.email]),
    username: new FormControl({ value: '', disabled: !this.vm.isEditUser }),
    city: new FormControl({ value: '', disabled: !this.vm.isEditUser }),
    totalStoryPoints: new FormControl({ value: 0, disabled: !this.vm.isEditUser || !this.vm.isEditPoints }),
  });

  protected citySuggestions = this.formGroup.controls.city.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    filter(Boolean),
    switchMap((value) => this.dadata.getCities(value))
  );

  protected areFieldsChanged$ = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    this.checkChangeFields();
  }

  private onEditUserSuccess: onSuccessEditionCbType = () =>
    this.snackBar.openFromTemplate(this.userAddedTemplateRef, SNACK_BAR_CONFIG);

  private onEditPointsSuccess: onSuccessEditionCbType = () =>
    this.snackBar.openFromTemplate(this.pointsAddedTemplateRef, SNACK_BAR_CONFIG);

  protected onSubmit(): void {
    this.editUser.emit({
      user: {
        name: this.formGroup.value.name || '',
        username: this.formGroup.value.username || '',
        city: this.formGroup.value.city || '',
        email: this.formGroup.value.email?.trim().toLowerCase() || '',
        totalStoryPoints: this.formGroup.value.totalStoryPoints || 0
      },
      onSuccessCb: this.onEditUserSuccess,
    });
  }

  protected onSubmitStoryPoints(): void {
    this.editUser.emit({
      user: { totalStoryPoints: this.formGroup.value.totalStoryPoints || 0 },
      onSuccessCb: this.onEditPointsSuccess,
    });
  }

  protected onCloseUser() {
    this.closeUser.emit();
  }

  protected onCloseEditMode() {
    this.closeEditMode.emit();
  }

  protected onOpenEditMode(params: QueryParamsConfig) {
    this.openEditMode.emit(params);
  }

  protected onDeleteUser() {
    this.deleteUser.emit();
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
