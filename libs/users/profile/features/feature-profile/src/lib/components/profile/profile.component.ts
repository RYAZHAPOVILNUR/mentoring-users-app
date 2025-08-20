import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { filter, of, tap } from 'rxjs';

import { LoadingStatus } from '@shared/util-store';
import { AuthFacade } from '@users/core/data-access-auth';
import { PasswordChangeDialogService } from '@users/profile/ui-password-change';
import { ProfileChangeDialogService } from '@users/profile/ui-profile-change';
import { UiPhotoModalComponent } from '@users/profile/ui-profile-photo';
import { UserEntity } from '@users/shared/data-access-models';

interface ProfileFormVm {
  user: UserEntity;
  githubUserName?: string;
  githubStatus?: LoadingStatus;
  isLoggedUser: boolean;
}

@Component({
  selector: 'users-profile',
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
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  @Input({ required: true }) vm!: ProfileFormVm;
  private readonly dialog = inject(MatDialog);
  private readonly authFacade = inject(AuthFacade);
  private readonly passwordChangeDialogService = inject(PasswordChangeDialogService);
  private readonly profileChangeDialogService = inject(ProfileChangeDialogService);
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

  onOpenChangePassword(): void {
    this.passwordChangeDialogService
      .open()
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.authFacade.changePassword(data)),
      )
      .subscribe();
  }

  onOpenChangeProfileData(): void {
    this.profileChangeDialogService
      .open(this.vm.user)
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this.authFacade.changeProfileData(data)),
      )
      .subscribe();
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
