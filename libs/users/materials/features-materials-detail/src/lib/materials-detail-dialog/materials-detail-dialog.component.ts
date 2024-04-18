import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { urlFileValidator } from './urlValidator';

@Component({
  selector: 'users-materials-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './materials-detail-dialog.component.html',
  styleUrls: ['./materials-detail-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsDetailDialogComponent {
  public dialogData = inject(MAT_DIALOG_DATA);
  public dialogRef = inject(MatDialogRef);

  public dialogForm: any;

  constructor(private fb: FormBuilder) {
    this.dialogForm = this.fb.group({
      title: ['', [Validators.required, urlFileValidator(this.dialogData.type)]],
      material_link: ['', [Validators.required, urlFileValidator(this.dialogData.type)]],
    });
  }

  public dialogClose(): void {
    this.dialogRef.close();
  }

  public onCreateMaterial(): void {
    const isValid = this.dialogForm.valid;

    if (!isValid) return;
    this.dialogRef.close(this.dialogForm.value);
  }
}
