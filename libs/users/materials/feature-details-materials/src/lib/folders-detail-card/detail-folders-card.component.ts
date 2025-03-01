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
import { onSuccessEditionCbType, onSuccessAddStoryPointsCbType } from '@users/users/data-access';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { DetailFoldersCardVm } from './detail-folders-card-vm';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateFolderDTO, CreateUserDTO, FolderEntity, UsersEntity } from '@users/core/data-access';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DadataApiService } from '@dadata';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { PushPipe } from '@ngrx/component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'detail-folders-card',
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
  templateUrl: './detail-folders-card.component.html',
  styleUrls: ['./detail-folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailFoldersCardComponent implements OnInit {
  private _vm: DetailFoldersCardVm = {
    editMode: false,
    folder: null,
    status: 'init',
    errors: null,
  };
  public get vm() {
    return this._vm;
  }
  @Input({ required: true })
  set vm(vm: DetailFoldersCardVm) {
    this._vm = vm;

    if (vm.folder) {
      this.formGroup.patchValue({
        title: vm.folder.title,
      });
    }

    if (vm.editMode) {
      this.formGroup.enable();
    } else {
      this.formGroup.disable();
    }
  }

  public formGroup = new FormBuilder().group({
    title: new FormControl({ value: '', disabled: !this.vm.editMode }, [Validators.required]),
  });

  @Output() editFolder = new EventEmitter<{
    folder: FolderEntity;
    onSuccessCb: onSuccessEditionCbType;
  }>();
  @Output() closeFolder = new EventEmitter();
  @Output() closeEditMode = new EventEmitter();
  @Output() openEditMode = new EventEmitter();
  @Output() deleteFolder = new EventEmitter();
  @ViewChild('snackbarFolder') snackbarTemplateRef!: TemplateRef<any>;

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
    this.editFolder.emit({
      folder: {
        id: this._vm.folder?.id || 0,
        title: this.formGroup.value.title || '',
        created_at: new Date().getDate().toString(),
        typeFolder: this._vm.folder?.typeFolder,
        isOwn: this._vm.folder?.isOwn || false,
      },
      onSuccessCb: this.onEditSuccess,
    });
  }

  onCloseFolder() {
    this.closeFolder.emit();
  }

  onCloseEditMode() {
    this.closeEditMode.emit();
  }

  onOpenEditMode() {
    this.openEditMode.emit();
  }

  onDeleteFolder() {
    this.deleteFolder.emit();
  }

  private checkChangeFields() {
    this.formGroup.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(() => {
          const formEntries = Object.entries(this.formGroup.controls);
          const isFormControlChanged = (key: string, control: FormControl) =>
            this.vm.folder && this.vm.folder[key as keyof FolderEntity] !== control.value;

          const isFieldChanged = formEntries.some(([key, control]) => isFormControlChanged(key, control));

          this.areFieldsChanged$.next(isFieldChanged);
        })
      )
      .subscribe();
  }
}
