import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'users-create-materials-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-materials-dialog.component.html',
  styleUrls: ['./create-materials-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMaterialsDialogComponent {
  public dialogRef = inject(MatDialogRef<CreateMaterialsDialogComponent>);
  public formGroup = new FormBuilder().group({
    title: new FormControl('', [Validators.required]),
    material_link: new FormControl('', [Validators.required]),
  });
  public onSubmit(){
    this.dialogRef.close(this.formGroup.value)
  }
}
