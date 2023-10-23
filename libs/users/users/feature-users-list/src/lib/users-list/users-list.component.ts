import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListVM } from './users-list-view-model';
import { UsersCardComponent } from "../users-card/users-card.component";
import { UsersVM } from '../../../../users-vm';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'users-list-ui',
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    UsersCardComponent,
    MatProgressBarModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatIconModule
  ]
})
export class UsersListComponent {
  @Input({ required: true })
  vm!: UsersListVM;

  @Output() deleteUser = new EventEmitter()
  @Output() redirectToEdit = new EventEmitter()
  @Output() filterUsers = new EventEmitter()

  public formGroup = new FormBuilder().group({
    name: new FormControl(''),
  })

  onDeleteUser(user: UsersVM) {
    this.deleteUser.emit(user)
  }

  onRedirectToEdit(editData: { id: number, editMode: boolean }) {
    this.redirectToEdit.emit(editData)
  }

  onHandleFilter() {
    this.filterUsers.emit(this.formGroup.value.name);
  }

  inputFilterChange() {
    const filterField = this.formGroup.get('name');
     if (!filterField?.value && filterField?.dirty) {
        this.onHandleFilter();
     }
  }
}
