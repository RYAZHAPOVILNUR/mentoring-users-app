import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AuthStore } from '@users/core/data-access-auth';
import { UiPhotoModalComponent } from '@users/profile/ui-profile-photo';

@Component({
  selector: 'users-navbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDialogModule, MatListModule, RouterModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private readonly authStore = inject(AuthStore);
  private readonly dialog = inject(MatDialog);
  public readonly userPhoto = this.authStore.userPhoto;
  public readonly photo = this.userPhoto() ? this.userPhoto() : '';

  public onLogout() {
    this.authStore.logout();
  }

  onZoomPhotoClick() {
    this.dialog.open(UiPhotoModalComponent, { data: this.photo || '' });
  }
}
