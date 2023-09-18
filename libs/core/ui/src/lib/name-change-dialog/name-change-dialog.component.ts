import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { InputNameComponent } from '../input-name/input-name.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {PushPipe} from "@ngrx/component";


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'name-change-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    InputNameComponent,
    MatTooltipModule,
    PushPipe
  ],
  templateUrl: './name-change-dialog.component.html',
  styleUrls: ['./name-change-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NameChangeDialogComponent{
  public dialogRef = inject(MatDialogRef<NameChangeDialogComponent>);
  private readonly destroyRef = inject(DestroyRef);

  public formGroup = new FormBuilder().group({
    newName: new FormControl('', [Validators.required]),
  });

  onNoClick() {
    this.dialogRef.close();
  }
}