import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserDTO, UsersErrors } from '@users/users/data-access';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { DetailUsersCardVm } from './detail-users-card-vm';
import { Subject } from "rxjs";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'detail-users-card',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule
  ],
  templateUrl: './detail-users-card.component.html',
  styleUrls: ['./detail-users-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DetailUsersCardComponent {
  private _vm: DetailUsersCardVm = { editMode: false, user: null, status: 'init', errors: null };
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
        city: vm.user.city
      });
    }

    if (vm.status === 'updated') {
      this.toggleAlertTrigger()
    }

    if (vm.editMode) {
      this.formGroup.enable();
    } else {
      this.formGroup.disable();
    }
  }

  public alertTrigger = new Subject<boolean>();

  public formGroup = new FormBuilder().group({
    name: new FormControl({ value: '', disabled: !this.vm.editMode }, [Validators.required]),
    email: new FormControl({ value: '', disabled: !this.vm.editMode }, [Validators.required, Validators.email]),
    username: new FormControl({ value: '', disabled: !this.vm.editMode }),
    city: new FormControl({ value: '', disabled: !this.vm.editMode }),
  });



  @Output() editUser = new EventEmitter<CreateUserDTO>();
  @Output() closeUser = new EventEmitter();
  @Output() closeEditMode = new EventEmitter();
  @Output() openEditMode = new EventEmitter();

  onEditUser(userData: CreateUserDTO) {
    this.editUser.emit(userData);
  }

  private toggleAlertTrigger(): void {
    this.alertTrigger.next(true);
    setTimeout(() => {
      this.alertTrigger.next(false)
    }, 3000);
  }

  submit(): void {
    this.editUser.emit({
      name: this.formGroup.value.name || '',
      username: this.formGroup.value.username || '',
      city: this.formGroup.value.city || '',
      email: this.formGroup.value.email || ''
    });
    this.toggleAlertTrigger();
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

}
