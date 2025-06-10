import { UiPhotoModalComponent } from 'libs/users/profile/ui-profile/ui-photo-modal/ui-photo-modal.component';
import { AuthFacade, ChangePasswordPayload, ChangeProfileDataPayload } from '../../../core/auth/data-access/src';
import { ChangeDetectionStrategy, Component, Input, OnInit, DestroyRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { PasswordChangeDialogComponent, ProfileChangeDialogComponent } from '../../../core/ui/src';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { EventEmitter, Output, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { ProfileFormVm } from './feature-user-info-vm';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'feature-user-info',
  standalone: true,
  imports: [
    PasswordChangeDialogComponent,
    ProfileChangeDialogComponent,
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
export class FeatureUserInfoComponent implements OnInit,   OnDestroy {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly authFacade = inject(AuthFacade);
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);

  @Input({ required: true }) vm!: ProfileFormVm;

  @Output() loadPhoto: EventEmitter<File> = new EventEmitter<File>();
  @Output() connectGithub: EventEmitter<void> = new EventEmitter();
  @Output() disconnectGithub: EventEmitter<void> = new EventEmitter();

  public photo: any;
  public isPhotoHovered?: boolean;

  ngOnInit(): void {
    this.photo = this.vm.user.photo ? this.vm.user.photo.url : '';
    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/github.svg`)
    );
    of(this.vm.githubUserName).subscribe(console.log);

     // Initialize timer from localStorage
     const savedSeconds = localStorage.getItem(this.STORAGE_SECONDS);
     const savedRunning = localStorage.getItem(this.STORAGE_RUNNING);

     this.totalSeconds = savedSeconds ? parseInt(savedSeconds, 10) : 0;
     this.isRunning = savedRunning === 'true';

     if (this.isRunning) {
       this.startInterval();
     }
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

  handleFileInput(event: any) {
    const file = event.target.files[0];
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

   // Timer functionality
   totalSeconds = 0;
   isRunning = false;
   private intervalId: any = null;
   private templateUpdate = inject(ChangeDetectorRef);

   readonly STORAGE_SECONDS = 'timerSeconds';
   readonly STORAGE_RUNNING = 'timerIsRunning';

   get displayTime(): string {
     const days = Math.floor(this.totalSeconds / 86400);
     const hours = Math.floor((this.totalSeconds % 86400) / 3600);
     const minutes = Math.floor((this.totalSeconds % 3600) / 60);
     const seconds = this.totalSeconds % 60;
     return `${days}д ${hours}ч ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

   get toggleIcon(): string {
     return this.isRunning ? 'pause' : 'timer';
   }

   private clearInterval(): void {
     if (this.intervalId !== null) {
       clearInterval(this.intervalId);
       this.intervalId = null;
     }
   }

   private startInterval(): void {
     this.clearInterval();
     this.intervalId = setInterval(() => {
       this.totalSeconds++;
       localStorage.setItem(this.STORAGE_SECONDS, this.totalSeconds.toString());
       this.templateUpdate.markForCheck();
     }, 1000);
   }

   toggleTimer(): void {
     this.isRunning = !this.isRunning;
     localStorage.setItem(this.STORAGE_RUNNING, this.isRunning.toString());

     if (this.isRunning) {
       this.startInterval();
     } else {
      this.clearInterval();
     }
   }

   resetTimer(): void {
     this.clearInterval();
     this.totalSeconds = 0;
     this.isRunning = false;
     localStorage.removeItem(this.STORAGE_SECONDS);
     localStorage.removeItem(this.STORAGE_RUNNING);
   }

   ngOnDestroy(): void {
     this.clearInterval();
   }
}
