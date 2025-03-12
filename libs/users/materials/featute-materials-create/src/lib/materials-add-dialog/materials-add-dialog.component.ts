import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'materials-add-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent {
  public formGroup!: FormGroup;
  private formBuilder = inject(FormBuilder);
  public data: { type: string } = inject(MAT_DIALOG_DATA);
  public dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>);

  constructor() {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      link: ['', Validators.required],
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.formGroup.value);
  }
}
