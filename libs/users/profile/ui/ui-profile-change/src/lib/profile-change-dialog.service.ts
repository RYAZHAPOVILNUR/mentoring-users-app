import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { ProfileChangeDialogComponent } from './profile-change-dialog/profile-change-dialog.component';
import { ProfileChangeDialogCloseData } from './profile-change-dialog-close-data.type';
import { ProfileChangeDialogData } from './profile-change-dialog-data.type';

@Injectable({ providedIn: 'root' })
export class ProfileChangeDialogService {
  private readonly dialog = inject(MatDialog);

  private readonly defaultConfig: MatDialogConfig = {
    width: '400px',
  };

  open(data: ProfileChangeDialogData): MatDialogRef<ProfileChangeDialogComponent, ProfileChangeDialogCloseData> {
    return this.dialog.open<ProfileChangeDialogComponent, ProfileChangeDialogData, ProfileChangeDialogCloseData>(
      ProfileChangeDialogComponent,
      { ...this.defaultConfig, data },
    );
  }
}
