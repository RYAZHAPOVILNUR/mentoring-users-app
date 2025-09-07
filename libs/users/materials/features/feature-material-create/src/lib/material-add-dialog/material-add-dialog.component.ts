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

import { materialRegex, MaterialType, iconMap, CreateMaterial } from '@users/data-access-material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || isSubmitted));
  }
}

type DialogRef = MatDialogRef<MaterialAddDialogComponent, CreateMaterial>;

@Component({
  selector: 'users-material-add-dialog',
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

  templateUrl: './material-add-dialog.component.html',
  styleUrl: './material-add-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialAddDialogComponent implements OnInit {
  public readonly fb = inject(FormBuilder).nonNullable;
  public readonly dialogRef: DialogRef = inject(MatDialogRef);
  public readonly typeMaterialData: MaterialType = inject(MAT_DIALOG_DATA).data;

  public readonly iconMap = iconMap;

  public readonly form = this.fb.group({
    title: ['', Validators.required],
    material_link: [''],
  });

  ngOnInit(): void {
    this.updateLinkValidators(this.typeMaterialData);
  }
  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.getRawValue());
    }
  }

  private updateLinkValidators(type: MaterialType) {
    const control = this.form.get('material_link');

    control?.setValidators([Validators.required, Validators.pattern(materialRegex[type])]);
    control?.updateValueAndValidity();
  }
}
