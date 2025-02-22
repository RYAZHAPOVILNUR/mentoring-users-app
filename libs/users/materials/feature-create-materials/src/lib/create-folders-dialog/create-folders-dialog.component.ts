import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Inject, inject } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-create-folders-dialog',
  standalone: true,
  templateUrl: 'create-folders-dialog.component.html',
  styleUrls: ['create-folders-dialog.component.scss'],
  imports: [
      CommonModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatButtonModule,
      ReactiveFormsModule,
    ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFoldersDialogComponent {
  public formGroup: FormGroup;
  private formBuilder = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<CreateFoldersDialogComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string;}) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.formGroup.valid) {
      const formData = {
        name: this.formGroup.value.name,
      };
      this.dialogRef.close(formData);
    }
  }
}