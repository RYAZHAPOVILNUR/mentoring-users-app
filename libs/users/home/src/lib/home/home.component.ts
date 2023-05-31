import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListContainerComponent } from '@users/feature-users-list'
import { CreateUsersButtonComponent } from '@users/feature-users-create';

@Component({
  selector: 'users-home',
  standalone: true,
  imports: [CommonModule, UsersListContainerComponent, CreateUsersButtonComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
}