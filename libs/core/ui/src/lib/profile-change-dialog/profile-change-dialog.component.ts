import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LetDirective, PushPipe } from "@ngrx/component";
import { InputCityComponent } from '../input-city/input-city.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { UsersEntity } from '@users/core/data-access';
import { AuthFacade } from '@auth/data-access';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'profile-change-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputCityComponent,
    MatFormFieldModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    LetDirective,
    CommonModule,
    PushPipe
  ],
  templateUrl: './profile-change-dialog.component.html',
  styleUrls: ['./profile-change-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileChangeDialogComponent{
  public userEntityData: UsersEntity = inject(MAT_DIALOG_DATA);

  public formGroup = new FormBuilder().group({
    name: new FormControl(this.userEntityData.name, [Validators.required]),
    city: new FormControl(this.userEntityData.city, [Validators.required]),
    email: new FormControl(this.userEntityData.email, [Validators.required, Validators.email])
  });
}
