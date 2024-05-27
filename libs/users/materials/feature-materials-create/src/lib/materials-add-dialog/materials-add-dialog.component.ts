import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { dataTypeChecker } from './data-type-check-helper';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent {
  private readonly dialogRef = inject(
    MatDialogRef<MaterialsAddDialogComponent>
  );
  public readonly data: string = inject(MAT_DIALOG_DATA);

  public createMaterialForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    material_link: new FormControl('', [
      Validators.required,
      Validators.pattern(dataTypeChecker(this.data)),
    ]),
  });

  public createMaterial(): void {
    const data = {
      title: this.createMaterialForm.value.title,
      material_link: this.createMaterialForm.value.material_link,
    };
    this.dialogRef.close(data);
  }

  public close(): void {
    this.dialogRef.close(null);
  }
}
