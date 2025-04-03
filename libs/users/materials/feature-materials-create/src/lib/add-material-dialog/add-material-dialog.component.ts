import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'users-add-material-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  templateUrl: './add-material-dialog.component.html',
  styleUrls: ['./add-material-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMaterialDialogComponent {
  public readonly dialogData = inject(MAT_DIALOG_DATA);

  public materialData = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    materialLink: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  get materialWithUpdatedFields() {
    return {
      ...this.materialData.value,
      createdAt: new Date().getTime(),
      folderId: this.dialogData.folder.id,
    };
  }
}
