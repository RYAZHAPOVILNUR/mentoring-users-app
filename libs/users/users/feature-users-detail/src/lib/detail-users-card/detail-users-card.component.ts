import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersEntity } from '@users/users/data-access';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule
  ],
  templateUrl: './detail-users-card.component.html',
  styleUrls: ['./detail-users-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DetailUsersCardComponent implements OnInit {
  @Input({ required: true })
  user!: UsersEntity;
  @Input() editMode!: boolean;

  @Output() editUser = new EventEmitter<UsersEntity>();
  @Output() closeUser = new EventEmitter();

  public formGroup!: FormGroup;
  private formBuilder!: FormBuilder;

  ngOnInit(): void {
    this.formBuilder = new FormBuilder();
    this.formGroup = this.formBuilder.group({
      name: new FormControl({ value: '', disabled: !this.editMode }, [Validators.required]),
      email: new FormControl({ value: '', disabled: !this.editMode }, [Validators.required, Validators.email]),
      username: new FormControl({ value: '', disabled: !this.editMode }),
      city: new FormControl({ value: '', disabled: !this.editMode }),
    });
    this.formGroup.patchValue({
      name: this.user.name,
      email: this.user.email,
      username: this.user.username,
      city: this.user.city
    });
  }

  submit(): void {
    this.editUser.emit(this.formGroup.value)
  }

  onCloseUser() {
    this.closeUser.emit();
  }

}
