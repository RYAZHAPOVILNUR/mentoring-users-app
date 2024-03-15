import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-add-material-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './add-material-dialog.component.html',
  styleUrls: ['./add-material-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMaterialDialogComponent {
  private fb = inject(FormBuilder);
  public readonly materialType = inject(MAT_DIALOG_DATA);

  public formGroup = this.fb.group({
    title: ['', Validators.required],
    link: ['', Validators.required],
  });
}
