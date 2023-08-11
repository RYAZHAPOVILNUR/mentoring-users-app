import { ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { AuthFacade } from '@auth/data-access';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private readonly facade = inject(AuthFacade)
  public readonly userPhoto: Observable<string | undefined> = this.facade.user$.pipe(map(user => user.photo?.url))
  public readonly photo = this.userPhoto ? this.userPhoto : ''

  public onLogout() {
    this.facade.logout()
  }
}
