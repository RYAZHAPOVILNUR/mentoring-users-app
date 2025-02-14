/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CommonModule } from '@angular/common';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DadataApiService } from '@dadata';
import { PushPipe } from '@ngrx/component';
import { CreateUserDTO, UsersEntity } from '@users/core/data-access';
import { onSuccessEditionCbType } from '@users/users/data-access';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { DetailUsersCardVm } from './detail-users-card-vm';

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
    editSPMode: false,
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
        storypoints: vm.user.totalStoryPoints,
      });
    }

    if (vm.editMode) {
      this.formGroup.enable();
    } else {
      this.formGroup.disable();
    }

    if (vm.editSPMode) {
      this.formGroup.controls.storypoints.enable();
    } else {
      this.formGroup.controls.storypoints.disable();
    }
  }

  public formGroup = new FormBuilder().group({
    name: new FormControl({ value: '', disabled: !this.vm.editMode }, [Validators.required]),
    email: new FormControl({ value: '', disabled: !this.vm.editMode }, [Validators.required, Validators.email]),
    username: new FormControl({ value: '', disabled: !this.vm.editMode }),
    city: new FormControl({ value: '', disabled: !this.vm.editMode }),
    storypoints: new FormControl({ value: 0, disabled: !this.vm.editSPMode }, [Validators.pattern(/^\d+$/)]),
  });

  @Output() editUser = new EventEmitter<{
    user: CreateUserDTO;
    onSuccessCb: onSuccessEditionCbType;
  }>();
  @Output() editUserSP = new EventEmitter<{
    totalStoryPoints: number;
    id: number;
    onSuccessCb: onSuccessEditionCbType;
  }>();
  @Output() closeUser = new EventEmitter();
  @Output() closeEditMode = new EventEmitter();
  @Output() closeEditSPMode = new EventEmitter();
  @Output() openEditMode = new EventEmitter();
  @Output() openEditSPMode = new EventEmitter();
  @Output() deleteUser = new EventEmitter();
  @ViewChild('snackbar') snackbarTemplateRef!: TemplateRef<any>;
  @ViewChild('snackbarCancelEditSP') snackbarCancelEditSPTemplateRef!: TemplateRef<any>;
  @ViewChild('snackbarEditSP') snackbarEditSPTemplateRef!: TemplateRef<any>;
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

  private onEditSPSuccess: onSuccessEditionCbType = () => {
    this.snackBar.openFromTemplate(this.snackbarEditSPTemplateRef, {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  };

  onSubmit(): void {
    this.editUser.emit({
      user: {
        name: this.formGroup.value.name || '',
        username: this.formGroup.value.username || '',
        city: this.formGroup.value.city || '',
        email: this.formGroup.value.email?.trim().toLowerCase() || '',
        totalStoryPoints: this.formGroup.value.storypoints || 0,
        purchaseDate: new Date().toString(),
        educationStatus: 'trainee',
      },
      onSuccessCb: this.onEditSuccess,
    });
  }

  onSubmitUserSP() {
    const id = this.vm.user?.id;
    const totalStoryPoints = this.formGroup.value.storypoints;

    if (!id || !totalStoryPoints) return;

    this.editUserSP.emit({
      totalStoryPoints,
      id,
      onSuccessCb: this.onEditSPSuccess,
    });
  }

  onCloseUser() {
    this.closeUser.emit();
  }

  onCloseEditMode() {
    this.closeEditMode.emit();
  }

  onCloseEditSPMode() {
    this.closeEditSPMode.emit();
    this.snackBar.openFromTemplate(this.snackbarCancelEditSPTemplateRef, {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  onOpenEditMode() {
    this.openEditMode.emit();
  }

  onOpenEditSPMode() {
    this.openEditSPMode.emit();
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
