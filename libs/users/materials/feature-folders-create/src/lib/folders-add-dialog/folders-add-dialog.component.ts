import { ChangeDetectionStrategy, Component, inject, Inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-folders-add-dialog',
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
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddDialogComponent {
    public formGroup: FormGroup;
    private formBuilder = inject(FormBuilder);
    public dialogRef = inject(MatDialogRef<FoldersAddDialogComponent>);
  
    constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string }) {
      this.formGroup = this.formBuilder.group({
        title: ['', Validators.required],
      });
    }
  
    cancel(): void {
      this.dialogRef.close();
    }
  
    save(): void {
      if (this.formGroup.valid) {
        const formData = {
          title: this.formGroup.value.title,
        };
        this.dialogRef.close(formData);
      }
    }
  
}
