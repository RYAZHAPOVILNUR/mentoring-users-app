import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormsModule,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogClose } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MaterialType } from '@users/data-access-material';

import { MATERIAL_ICONS } from '../constants/material-icon.constant';
import { MATERIAL_REGEX } from '../constants/material-regex.constant';
import { CreateMaterialCloseData } from '../types/create-material-close-data.type';

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || isSubmitted));
  }
}

type DialogRef = MatDialogRef<CreateMaterialDialogComponent, CreateMaterialCloseData>;

@Component({
  selector: 'users-create-material-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogClose,
  ],
  providers: [{ provide: ErrorStateMatcher, useClass: MyErrorStateMatcher }],

  templateUrl: './create-material-dialog.component.html',
  styleUrl: './create-material-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMaterialDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef: DialogRef = inject(MatDialogRef);
  private readonly data = inject<MaterialType>(MAT_DIALOG_DATA);
  public readonly materialType = this.data;
  public readonly materialIcon = MATERIAL_ICONS;

  public readonly form = this.fb.group({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    materialLink: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        (control) => {
          const pattern = MATERIAL_REGEX[this.materialType];
          if (!pattern) return null;
          return pattern.test(control.value) ? null : { pattern: true };
        },
      ],
    }),
  });
  public onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.getRawValue());
    }
  }
}
