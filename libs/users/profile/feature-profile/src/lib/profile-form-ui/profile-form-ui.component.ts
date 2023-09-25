import { EventEmitter, OnInit, Output, inject } from '@angular/core';
import { ChangeDetectionStrategy, Component, Input, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileFormVm } from './profile-form-ui-vm';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { PasswordChangeDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthFacade, ChangePasswordPayload } from '@auth/data-access';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { of } from 'rxjs';

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
    PasswordChangeDialogComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './profile-form-ui.component.html',
  styleUrls: ['./profile-form-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFormUiComponent implements OnInit {

  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly authFacade = inject(AuthFacade);
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);

  private _vm!: ProfileFormVm;

  @Input({ required: true })
  set vm(vm: ProfileFormVm) {
    this._vm = vm;
  }
  get vm(): ProfileFormVm {
    return this._vm;
  }

  @Output() loadPhoto: EventEmitter<File> = new EventEmitter<File>();
  @Output() connectGithub: EventEmitter<void> = new EventEmitter();
  @Output() disconnectGithub: EventEmitter<void> = new EventEmitter();

  ngOnInit() {
    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `assets/icons/github.svg`
      )
    )

    of(this.vm.githubUserName).subscribe(console.log);
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

  public handleFileInput(event: any): void {
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
}
