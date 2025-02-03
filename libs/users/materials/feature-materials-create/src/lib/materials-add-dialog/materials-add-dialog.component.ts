import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IAddMaterial } from 'libs/users/materials/data-access/src/lib/models/materials-add.model';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent {
  public materialAddFormGroup: FormGroup;
  private formBuilder = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { type: string }) {
    this.materialAddFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      link: ['', Validators.required],
    });
  }

  public save(): void {
    if (this.materialAddFormGroup.valid) {
      const formData: IAddMaterial = {
        title: this.materialAddFormGroup.value.name,
        material_link: this.materialAddFormGroup.value.link,
      };
      this.dialogRef.close(formData);
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
