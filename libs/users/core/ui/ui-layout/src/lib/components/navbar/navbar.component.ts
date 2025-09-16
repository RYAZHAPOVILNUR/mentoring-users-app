import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { map, Observable } from 'rxjs';

import { AuthFacade } from '@users/core/data-access-auth';
import { UiPhotoModalComponent } from '@users/profile/ui-profile-photo';

@Component({
  selector: 'users-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatListModule,
    RouterModule,
    TranslateModule,
    PushPipe,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private readonly facade = inject(AuthFacade);
  private readonly dialog = inject(MatDialog);
  public readonly userPhoto: Observable<string | undefined> = this.facade.user$.pipe(map((user) => user.photo?.url));
  public readonly photo = this.userPhoto ? this.userPhoto : '';

  public onLogout() {
    this.facade.logout();
  }

  onZoomPhotoClick() {
    this.userPhoto.subscribe((photoUrl) => {
      this.dialog.open(UiPhotoModalComponent, { data: photoUrl || '' });
    });
  }
}
