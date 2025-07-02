import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { AuthFacade, ChangePasswordPayload, ChangeProfileDataPayload } from '@users/core/data-access-auth';
import { PasswordChangeDialogComponent, ProfileChangeDialogComponent } from '@users/core/ui';
import { of } from 'rxjs';
import { UiPhotoModalComponent } from 'ui-profile';

import { ProfileFormVm } from './feature-user-info-vm';

@Component({
  selector: 'users-feature-user-info',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './feature-user-info.component.html',
  styleUrls: ['./feature-user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureUserInfoComponent implements OnInit {
  @Input({ required: true }) vm!: ProfileFormVm;
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly authFacade = inject(AuthFacade);
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public photo: any;
  public isPhotoHovered?: boolean;
  @Output() loadPhoto: EventEmitter<File> = new EventEmitter<File>();

  @Output() connectGithub: EventEmitter<void> = new EventEmitter();
  @Output() disconnectGithub: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {
    this.photo = this.vm.user.photo ? this.vm.user.photo.url : '';
    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/github.svg`),
    );
    of(this.vm.githubUserName).subscribe(console.log);
  }

  onOpenChangePassword() {
    const dialogRef = this.dialog.open(PasswordChangeDialogComponent);
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          const changePasswordPayload: ChangePasswordPayload = {
            newPassword: result.value.newPassword,
            oldPassword: result.value.oldPassword,
          };
          this.authFacade.changePassword(changePasswordPayload);
        }
      });
  }

  onOpenChangeProfileData() {
    const dialogRef = this.dialog.open(ProfileChangeDialogComponent, {
      width: '400px',
      data: this.vm.user,
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          const changeProfileDataPayload: ChangeProfileDataPayload = {
            ...result.value,
          };
          this.authFacade.changeProfileData(changeProfileDataPayload);
        }
      });
  }

  onMouseEnter() {
    this.isPhotoHovered = true;
  }

  onMouseLeave() {
    this.isPhotoHovered = false;
  }

  handleFileInput(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.loadPhoto.emit(file);
    }
  }

  onConnectGithub() {
    this.connectGithub.emit();
  }

  onDisconnectGithub() {
    this.disconnectGithub.emit();
  }

  onZoomPhotoClick() {
    this.dialog.open(UiPhotoModalComponent, {
      data: this.vm.user.photo ? this.vm.user.photo.url : '',
    });
  }
}
