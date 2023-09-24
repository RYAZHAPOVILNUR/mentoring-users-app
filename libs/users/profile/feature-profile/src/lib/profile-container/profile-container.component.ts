import { authActions, selectAuthStatus, selectLoggedUser } from '@auth/data-access';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FeatureUserGeneralComponent } from '../../../../feature-user-general/feature-user-general.component';
import { FeatureUserInfoComponent } from '../../../../feature-user-info/feature-user-info.component';
import { CropperDialogComponent } from '@users/core/ui';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { UsersEntity } from '@users/core/data-access';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'profile-container',
  standalone: true,
  imports: [
    FeatureUserGeneralComponent,
    FeatureUserInfoComponent,
    LetDirective,
    CommonModule,
  ],
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileContainerComponent {
  private readonly store = inject(Store);
  public readonly user!: UsersEntity;
  private readonly dialog = inject(MatDialog);

  public readonly user$ = this.store.select(selectLoggedUser);
  public readonly status$ = this.store.select(selectAuthStatus);


  onLoadPhoto(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;

      const dialogRef = this.dialog.open(CropperDialogComponent, {
        data: { image }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.store.dispatch(authActions.uploadImage({image: result}))
        }
      });
    };
    reader.readAsDataURL(file);
  }
  
}
 