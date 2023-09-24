import { AuthFacade } from '@auth/data-access';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { InputEmailComponent } from '../input-email/input-email.component';
import { InputNameComponent } from '../input-name/input-name.component';
import { InputCityComponent } from '../input-city/input-city.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { LetDirective, PushPipe } from "@ngrx/component";


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'profile-change-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputEmailComponent,
    InputCityComponent,
    MatFormFieldModule,
    InputNameComponent,
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
  private dialogRef = inject(MatDialogRef<ProfileChangeDialogComponent>);
  private readonly destroyRef = inject(DestroyRef);
  private authFacade = inject(AuthFacade);
  public onCityReceived (receivedCityControl: any) {
    this.formGroup.addControl("city", receivedCityControl);
  }
  public user$ = this.authFacade.user$;
  
  public formGroup = new FormBuilder().group({
    name: new FormControl('', [Validators.required]),
    city: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email])
  });

  onNoClick() {
    this.dialogRef.close();
  }

  // TODO - Собрать данные и отправить НОРМАЛЬНО, и что за там ошибки в консоле куча ?
  onSubmit(): void{
   console.log("user",this.user$);
  //  this.formGroup.add
    // this.authFacade.changeProfileData(this.formGroup.controls.city);
  }
}