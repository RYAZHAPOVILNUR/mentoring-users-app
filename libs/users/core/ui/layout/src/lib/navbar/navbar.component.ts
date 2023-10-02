import { ChangeDetectionStrategy, Component, ViewChild, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthFacade } from '@auth/data-access';
import { Observable, map } from 'rxjs';
import { PushPipe } from '@ngrx/component';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterModule, 
    TranslateModule,
    PushPipe,
    MatDialogModule,
    MatIconModule
  
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @ViewChild('photo') avatar!: any
  public dialog = inject(MatDialog)
  private readonly facade = inject(AuthFacade)
  public readonly userPhoto: Observable<string | undefined> = this.facade.user$.pipe(map(user => user.photo?.url))
  public readonly photo = this.userPhoto ? this.userPhoto : ''

  public onLogout() {
    this.facade.logout()
  }

  public openAvatar() {
    this.dialog.open(this.avatar)
  }
}
