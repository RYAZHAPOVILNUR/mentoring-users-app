import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileFormUiComponent } from '../profile-form-ui/profile-form-ui.component';
import { UsersEntity } from '@users/core/data-access';
import { Store } from '@ngrx/store';
import { selectAuthStatus, selectLoggedUser } from '@auth/data-access';
import { LetDirective } from '@ngrx/component';
import { CropperSettings, ImageCropperComponent } from 'ngx-image-cropper';
import { CropperDialogComponent } from '@users/core/ui';
import { MatDialog } from '@angular/material/dialog';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'profile-container',
  standalone: true,
  imports: [
    CommonModule,
    ProfileFormUiComponent,
    LetDirective,
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
  // img1: any

  onLoadPhoto(file: File) {
    // const reader = new FileReader();
    // reader.onload = (e: any) => {
    //   const image = new Image();
    //   image.src = e.target.result;

    //   const dialogRef = this.dialog.open(CropperDialogComponent, {
    //     data: { image }
    //   });

    //   dialogRef.afterClosed().subscribe(result => {
    //     if(result) {
    //       console.log('Cropped image data:', result);
    //     }
    //   });
    // };
    // reader.readAsDataURL(file);
  }
}
