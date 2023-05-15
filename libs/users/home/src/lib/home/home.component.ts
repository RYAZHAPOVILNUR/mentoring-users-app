import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@users/core/http';
import { UsersListContainerComponent } from '@users/feature-users-list'

@Component({
  selector: 'users-home',
  standalone: true,
  imports: [CommonModule, UsersListContainerComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly apiService = inject(ApiService)

  constructor() {
    this.apiService.get('/users').subscribe(res => console.log('HOME: ', res))
  }
}