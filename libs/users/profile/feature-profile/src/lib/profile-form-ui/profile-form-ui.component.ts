import { EventEmitter, Output, inject } from '@angular/core';
import { ChangeDetectionStrategy, Component, Input, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileFormVm } from './profile-form-ui-vm';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { PasswordChangeDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthFacade, ChangePasswordPayload } from '@auth/data-access';
import { MatDialog } from '@angular/material/dialog';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'profile-form-ui',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatSidenavModule,
    MatIconModule,
    PasswordChangeDialogComponent
  ],
  templateUrl: './profile-form-ui.component.html',
  styleUrls: ['./profile-form-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFormUiComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly authFacade = inject(AuthFacade);
  @Input({ required: true }) vm!: ProfileFormVm;
  @Input({ required: true }) isLoggedUser!: boolean;

  @Output() loadPhoto: EventEmitter<File> = new EventEmitter<File>();

  public photo: any;

  ngOnInit(): void {
    console.log(this.vm);
    this.photo = this.vm.user.photo ? this.vm.user.photo.url : ''
  }

  public onOpenChangePassword(): void {
    const dialogRef = this.dialog.open(PasswordChangeDialogComponent)
    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (result) {
          const changePasswordPayload: ChangePasswordPayload = {
            newPassword: result.value.newPassword,
            oldPassword: result.value.oldPassword
          }
          this.authFacade.changePassword(changePasswordPayload);
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
