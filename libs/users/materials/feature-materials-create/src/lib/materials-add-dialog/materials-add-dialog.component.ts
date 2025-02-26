import {
  ChangeDetectionStrategy,
  Component, inject,
  Inject,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule, NgForm,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = this.getSubmitted(form)
    return !!(control && control.invalid && (control.dirty || isSubmitted));
  }
  private getSubmitted(form: FormGroupDirective | NgForm | null): boolean {
    return !!(form && form.submitted)
  }
}

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
