import { ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthFacade } from '@auth/data-access';
import { Observable, map } from 'rxjs';
import { PushPipe } from '@ngrx/component';
import { UiPhotoModalComponent } from 'libs/users/profile/ui-profile/ui-photo-modal/ui-photo-modal.component';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatListModule,
    RouterModule, 
    TranslateModule,
    PushPipe
    
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private readonly facade = inject(AuthFacade);
  public readonly userPhoto: Observable<string | undefined> = this.facade.user$.pipe(map(user => user.photo?.url));
  public readonly photo = this.userPhoto ? this.userPhoto : ''
  private readonly dialog = inject(MatDialog);

  public onLogout() {
    this.facade.logout()
  }

  onZoomPhotoClick(){
    this.userPhoto.subscribe(photoUrl => {
      this.dialog.open(UiPhotoModalComponent, { data: photoUrl || '' });
    });
  }

}
