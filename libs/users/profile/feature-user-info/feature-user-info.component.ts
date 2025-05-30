import { UiPhotoModalComponent } from 'libs/users/profile/ui-profile/ui-photo-modal/ui-photo-modal.component';
import { AuthFacade, ChangePasswordPayload, ChangeProfileDataPayload } from '../../../core/auth/data-access/src';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  DestroyRef,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
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
import { interval, of, Subscription, timer } from 'rxjs';
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
    TranslateModule
  ],
  templateUrl: './feature-user-info.component.html',
  styleUrls: ['./feature-user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureUserInfoComponent implements OnInit, OnDestroy {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly authFacade = inject(AuthFacade);
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);

  public timerVisible = false;
  public timerRunning = false;
  public timer: { days: number, hours: number, minutes: number, seconds: number } = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  private timerSub?: Subscription;
  private cdr = inject(ChangeDetectorRef)

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

    this.loadTimerPopupState();
    this.loadTimer();
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
            oldPassword: result.value.oldPassword
          };
          this.authFacade.changePassword(changePasswordPayload);
        }
      });
    this.loadTimer();
  }

  onOpenChangeProfileData() {
    const dialogRef = this.dialog.open(ProfileChangeDialogComponent, {
      width: '400px',
      data: this.vm.user
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          const changeProfileDataPayload: ChangeProfileDataPayload = {
            ...result.value
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


  onTimerMouseClick() {
    this.timerVisible = !this.timerVisible;
    this.saveTimerPopupState();
  }

  startTimer() {
    if (this.timerRunning) return;
    this.timerRunning = true;
    this.saveTimer()
    this.timerSub = interval(1000).subscribe(() => {
      this.incrementTimer();
      this.saveTimer();
      this.cdr.detectChanges()
    });
  }

  pauseTimer() {
    this.timerRunning = false;
    this.timerSub?.unsubscribe();
    this.saveTimer();
  }

  resetTimer() {
    this.timer = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    this.pauseTimer();
    this.saveTimer();
  }

  incrementTimer() {
    this.timer.seconds++;
    if (this.timer.seconds >= 60) {
      this.timer.seconds = 0;
      this.timer.minutes++;
      if (this.timer.minutes >= 60) {
        this.timer.minutes = 0;
        this.timer.hours++;
        if (this.timer.hours >= 24) {
          this.timer.hours = 0;
          this.timer.days++;
        }
      }
    }
  }

  saveTimer() {
    localStorage.setItem('user-timer', JSON.stringify({
      timer: this.timer,
      running: this.timerRunning
    }));
  }

  saveTimerPopupState() {
    localStorage.setItem('user-timer-popup-visible', JSON.stringify(this.timerVisible));
  }

  loadTimerPopupState() {
    const data = localStorage.getItem('user-timer-popup-visible');
    if (data) {
      this.timerVisible = JSON.parse(data);
    }
  }

  loadTimer() {
    const data = localStorage.getItem('user-timer');
    if (data) {
      const parsed = JSON.parse(data);
      this.timer = parsed.timer;
      if (parsed.running) {
        this.startTimer();
      }
    }
  }

  get formattedTimer(): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${this.timer.days} дней ${this.timer.hours} часов ${pad(this.timer.minutes)}:${pad(this.timer.seconds)}`;
  }

  ngOnDestroy() {
    this.timerSub?.unsubscribe();
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
      data: this.vm.user.photo ? this.vm.user.photo.url : ''
    });
  }
}
