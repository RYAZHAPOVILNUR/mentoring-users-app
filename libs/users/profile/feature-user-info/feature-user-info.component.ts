import { ChangeDetectionStrategy, Component, Input, OnInit, DestroyRef } from '@angular/core';
import { PasswordChangeDialogComponent, ProfileChangeDialogComponent } from '@users/core/ui';
import { AuthFacade, ChangePasswordPayload, ChangeProfileDataPayload } from '@auth/data-access';
import { EventEmitter, Output, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { ProfileFormVm } from './feature-user-info-vm';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'feature-user-info',
  standalone: true,
  imports: [
    PasswordChangeDialogComponent,
    ProfileChangeDialogComponent,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './feature-user-info.component.html',
  styleUrls: ['./feature-user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureUserInfoComponent implements OnInit {
  private readonly dialog = inject(MatDialog); 
  private readonly destroyRef = inject(DestroyRef);
  private readonly authFacade = inject(AuthFacade);
  @Input({ required: true }) vm!: ProfileFormVm

  @Output() loadPhoto: EventEmitter<File> = new EventEmitter<File>();

  public photo: any;

  ngOnInit(): void {
    this.photo = this.vm.user.photo ? this.vm.user.photo.url : ''
  }
  onOpenChangePassword() {
    const dialogRef = this.dialog.open(PasswordChangeDialogComponent)
    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        console.log(result);

        if (result) {
          const changePasswordPayload: ChangePasswordPayload = {
            newPassword: result.value.newPassword,
            oldPassword: result.value.oldPassword
          }
          console.log(changePasswordPayload)
          this.authFacade.changePassword(changePasswordPayload);
        }
      });
  }

  onOpenChangeProfileData() {
    const dialogRef = this.dialog.open(ProfileChangeDialogComponent)
    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        console.log(result);
        
        if (result) {
          const changeProfileDataPayload: ChangeProfileDataPayload = {
            ...result.value,
          }
          this.authFacade.changeProfileData(changeProfileDataPayload);
        }
      });
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.loadPhoto.emit(file);
    } 
  }
}
