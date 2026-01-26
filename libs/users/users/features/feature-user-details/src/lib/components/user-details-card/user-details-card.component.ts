import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoadingStatus } from '@shared/util-store';
import { UserEntity } from '@users/shared/data-access-models';

export type DetailUsersCardVm = {
  editMode: boolean;
  status: LoadingStatus;
  user: UserEntity | null;
  errors?: any;
};

@Component({
  selector: 'users-detail-users-card',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
  templateUrl: './user-details-card.component.html',
  styleUrls: ['./user-details-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsCardComponent implements OnInit {
  private _vm: DetailUsersCardVm = {
    editMode: false,
    user: null,
    status: 'init',
  };

  private readonly snackBar = inject(MatSnackBar);

  // Форма для 4 основных полей
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl(''),
    city: new FormControl('')
  });

  // Отдельный control для сторипоинтов с особым поведением
  storyPointsControl = new FormControl(0, [Validators.min(0), Validators.required]);
  isEditingStoryPoints = false;
  private originalStoryPoints = 0;

  // СОБЫТИЯ
  @Output() addStoryPoints = new EventEmitter<{
    storyPoints: number;
    onSuccessCb: () => void;
  }>();

  @Output() updateUserData = new EventEmitter<{
    userData: any;
  }>();

  @Output() userClose = new EventEmitter<void>();
  @Output() editModeOpen = new EventEmitter<void>();
  @Output() editModeClose = new EventEmitter<void>();

  @Input({ required: true })
  set vm(vm: DetailUsersCardVm) {
    this._vm = vm;
    if (vm.user) {
      this.initFormData(vm.user);
    }
  }

  get vm(): DetailUsersCardVm {
    return this._vm;
  }

  ngOnInit() {
    // Изначально сторипоинты не редактируются
    this.storyPointsControl.disable();
  }

  private initFormData(user: UserEntity): void {
    // Основные 4 поля
    this.userForm.patchValue({
      name: user.name || '',
      email: user.email || '',
      username: user.username || '',
      city: user.city || ''
    });

    // Сторипоинты
    const storyPoints = user.totalStoryPoints || 0;
    this.storyPointsControl.setValue(storyPoints, { emitEvent: false });
    this.originalStoryPoints = storyPoints;

    // Управляем состоянием формы
    this.updateFormState();
  }

  private updateFormState(): void {
    if (this.vm.editMode) {
      this.userForm.enable();
    } else {
      this.userForm.disable();
    }
  }

  // НАЧАТЬ редактирование сторипоинтов (кнопка +)
  startEditStoryPoints(): void {
    // Убрана проверка на vm.editMode - можно редактировать всегда
    this.isEditingStoryPoints = true;
    this.storyPointsControl.enable();
    this.originalStoryPoints = Number(this.storyPointsControl.value) || 0;

    // Фокусируемся на поле и выделяем текст
    setTimeout(() => {
      const input = document.querySelector('.story-points-input') as HTMLInputElement;
      if (input) {
        input.focus();
        input.select();
      }
    }, 100);
  }

  // ПОДТВЕРДИТЬ изменение сторипоинтов (кнопка ✓)
  confirmStoryPointsEdit(): void {
    if (this.storyPointsControl.invalid) {
      this.snackBar.open('❌ Введите корректное значение (не меньше 0)', 'OK', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }

    const newStoryPoints = Number(this.storyPointsControl.value) || 0;

    // Если значение не изменилось
    if (newStoryPoints === this.originalStoryPoints) {
      this.cancelStoryPointsEdit();
      return;
    }

    // Закрываем режим редактирования
    this.isEditingStoryPoints = false;
    this.storyPointsControl.disable();

    // Отправляем новые сторипоинты
    this.addStoryPoints.emit({
      storyPoints: newStoryPoints,
      onSuccessCb: () => {
        this.snackBar.open(`✅ Story points сохранены: ${newStoryPoints}`, 'OK', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.originalStoryPoints = newStoryPoints;
      }
    });
  }

  // ОТМЕНИТЬ редактирование сторипоинтов (кнопка ×)
  cancelStoryPointsEdit(): void {
    this.storyPointsControl.setValue(this.originalStoryPoints, { emitEvent: false });
    this.isEditingStoryPoints = false;
    this.storyPointsControl.disable();
  }

  // Сохранить ВСЕ изменения (основные 4 поля)
  saveAllChanges(): void {
    if (this.userForm.invalid) {
      this.snackBar.open('❌ Проверьте правильность заполнения полей', 'OK', {
        duration: 3000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }

    const formValue = this.userForm.getRawValue();

    // Отправляем обновленные данные пользователя
    this.updateUserData.emit({
      userData: {
        name: formValue.name,
        email: formValue.email,
        username: formValue.username,
        city: formValue.city
      }
    });

    this.snackBar.open('✅ Данные пользователя сохранены!', 'OK', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  onBackButtonClick(): void {
    this.userClose.emit();
  }

  onEditButtonClick(): void {
    this.editModeOpen.emit();
  }

  onCloseButtonClick(): void {
    this.editModeClose.emit();
  }
}