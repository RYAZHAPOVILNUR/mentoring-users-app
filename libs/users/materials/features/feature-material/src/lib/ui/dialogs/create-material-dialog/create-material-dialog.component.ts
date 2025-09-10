import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
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
import { materialRegex, MaterialType, materialIconMap } from '@users/data-access-material';

import { CreateDialogCloseData } from '../../types/create-dialog-close-data.type';

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || isSubmitted));
  }
}

type DialogRef = MatDialogRef<CreateMaterialDialogComponent, CreateDialogCloseData>;

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
export class CreateMaterialDialogComponent implements OnInit {
  private readonly data = inject<MaterialType>(MAT_DIALOG_DATA);
  public readonly fb = inject(FormBuilder);
  public readonly materialType = this.data;
  public readonly dialogRef: DialogRef = inject(MatDialogRef);

  public readonly materialIcon = materialIconMap;

  public readonly form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    materialLink: [''],
  });

  ngOnInit(): void {
    this.updateLinkValidators(this.materialType);
  }
  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.getRawValue());
    }
  }

  private updateLinkValidators(type: MaterialType) {
    const control = this.form.get('materialLink');

    control?.setValidators([Validators.required, Validators.pattern(materialRegex[type])]);
    control?.updateValueAndValidity();
  }
}
