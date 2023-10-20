import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListVM } from './users-list-view-model';
import { UsersCardComponent } from '../users-card/users-card.component';
import { UsersVM } from '../../../../users-vm';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule,
  ],
})
export class UsersListComponent implements OnInit {

  @Input({ required: true })
  vm!: UsersListVM;
  @Output() deleteUser = new EventEmitter();
  @Output() filterUsers = new EventEmitter();
  @Output() redirectToEdit = new EventEmitter();
  public filterName = '';

  ngOnInit(): void {
this.filterName = this.vm.filterOptions.name}

  onFilterUser() {
    const filterOptions = {
      name: this.filterName,
    };
    this.filterUsers.emit(filterOptions);
  }

  clearFilterName(){
    this.filterName=''
    const filterOptions = {
      name: this.filterName,
    };
    this.filterUsers.emit(filterOptions);
  }


  onDeleteUser(user: UsersVM) {
    this.deleteUser.emit(user);
  }

  onRedirectToEdit(editData: { id: number; editMode: boolean }) {
    this.redirectToEdit.emit(editData);
  }
}
