import { UiPhotoModalComponent } from 'libs/users/profile/ui-profile/ui-photo-modal/ui-photo-modal.component';
import { AuthFacade, ChangePasswordPayload, ChangeProfileDataPayload } from '../../../core/auth/data-access/src';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { PasswordChangeDialogComponent, ProfileChangeDialogComponent } from '../../../core/ui/src';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
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
import { map, of, Subscription, tap, timer } from 'rxjs';
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
export class FeatureUserInfoComponent implements OnInit {
  @Input({ required: true }) vm!: ProfileFormVm;
  @Output() loadPhoto: EventEmitter<File> = new EventEmitter<File>();
  @Output() connectGithub: EventEmitter<void> = new EventEmitter();
  @Output() disconnectGithub: EventEmitter<void> = new EventEmitter();
  public photo: any;
  public isPhotoHovered?: boolean;
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly authFacade = inject(AuthFacade);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);
  private timerSubscriber: Subscription | null = null;
  private isRunning = false;
  private readonly initialTimerValues = {
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
  };

  public timerValues = JSON.parse(localStorage.getItem('timer') || `${this.initialTimerValues}`);

  ngOnInit(): void {
    this.photo = this.vm.user.photo ? this.vm.user.photo.url : '';
    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/github.svg`)
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

  onStartTimer() {
    if (this.isRunning != false) return;
    this.isRunning = true;
    this.timerSubscriber = timer(0, 1000)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(() => this.timerValues.seconds + 1),
        map((seconds) => {
          return {
            seconds: seconds % 60,
            minutes: Math.floor(seconds / 60) % 60,
            hours: Math.floor(seconds / (60 * 60)) % 24,
            days: Math.floor(seconds / (60 * 60 * 24)),
          };
        }),
        tap((timer) => {
          this.timerValues = timer;
          localStorage.setItem('timer', JSON.stringify(timer));
          this.changeDetector.markForCheck();
        })
      )
      .subscribe();
  }

  onPauseTimer() {
    this.isRunning = false;
    this.timerSubscriber?.unsubscribe();
  }

  onClearTimer() {
    this.isRunning = false;
    this.timerSubscriber?.unsubscribe();
    localStorage.removeItem('timer');
    this.timerValues = this.initialTimerValues;
  }
}
