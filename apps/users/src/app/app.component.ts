import {Component, inject} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import {UsersService} from "./users.service";

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  providers: [],
  selector: 'users-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'users';
  private readonly usersService = inject(UsersService);
}
