import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MaterialsTypeOfLinkPipe } from '../../../../../core/pipes';
import { materialType } from '@users/materials/data-access'

export function linkTypeValidator(type: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const link = control.value;
    if (!link) return null;

    const pipe = new MaterialsTypeOfLinkPipe();
    const icon = pipe.transform(link) as keyof typeof materialType;
    if (materialType[icon] === type) {
      return null;
    }
    return { invalidLinkType: { actual: icon } };
  };
}


@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>);
  private readonly formBuilder = inject(FormBuilder);
  public readonly formGroup = this.formBuilder.group({
    title: ['', Validators.required],
    link: ['', [Validators.required, linkTypeValidator(this.data.type)]]
  });
  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: { type: string }) {}

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.formGroup.valid) {
      const { title, link } = this.formGroup.value;
      this.dialogRef.close({ title, material_link: link });
    }
  }
}
