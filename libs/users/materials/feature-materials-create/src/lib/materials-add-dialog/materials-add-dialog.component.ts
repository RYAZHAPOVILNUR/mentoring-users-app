import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MaterialCreate } from '@users/materials/data-access';

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsAddDialogComponent {
  private dialogRef: MatDialogRef<MaterialsAddDialogComponent> = inject(MatDialogRef<MaterialsAddDialogComponent>);
  private fb: FormBuilder = inject(FormBuilder);
  public materialTypes: string[] = ['Видео', 'Файл PDF', 'Подкаст'];
  public formGroup: FormGroup = this.fb.group({
    type: ['Видео', Validators.required],
    title: ['', Validators.required],
    link: ['', [Validators.required]]
  }, { validators: this.typeValidate() });

  public cancel(): void {
    this.dialogRef.close();
  }

  public add(): void {
    const data: MaterialCreate = {
      title: this.formGroup.value.title.trim(),
      material_link: this.formGroup.value.link.trim()
    };
    this.dialogRef.close(data);
  }

  public typeValidate(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const type = formGroup.get('type')?.value;
      const link = formGroup.get('link')?.value;

      if (type === this.materialTypes[0]) {
        return link.includes('https://www.youtube.com') ? null : { typeLink: 'incorrect' };
      }
      if (type === this.materialTypes[1]) {
        return /.+\.pdf$/i.test(link) ? null : { typeLink: 'incorrect' };
      }
      if (type === this.materialTypes[2]) {
        return /.+\.mp3$/i.test(link) ? null : { typeLink: 'incorrect' };
      }

      return null;
    };
  }
}
