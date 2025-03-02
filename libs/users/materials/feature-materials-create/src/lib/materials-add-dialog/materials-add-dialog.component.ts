import {
  ChangeDetectionStrategy,
  Component, inject,
  Inject,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MyErrorStateMatcher } from '../../../../../core/ui/classes/src/lib/my-error-state-matcher';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent {
  public formGroup: FormGroup;
  private dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>)
  private fb = inject(FormBuilder)

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string }) {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      link: ['', [Validators.required]],
    });
  }

  matcher = new MyErrorStateMatcher()

  save(): void {
    if (this.formGroup.valid) {
      const formData = {
        name: this.formGroup.value.name,
        link: this.formGroup.value.link,
      };
      this.dialogRef.close(formData);
    }
  }
}
