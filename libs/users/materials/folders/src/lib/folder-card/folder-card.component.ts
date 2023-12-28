import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Inject } from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { IFolder } from '../../../../data-access/src/lib/models/ifolder';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-folder-card',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './folder-card.component.html',
  styleUrls: ['./folder-card.component.scss'],
})
export class FolderCardComponent {
  constructor(
    public dialogRef: MatDialogRef<FolderCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data);

    if (this.data?.folder) {
      this.isNew = false;
    }
  }

  folderTitles = this.data?.folderTitles;
  myForm: FormGroup = new FormGroup({
    title: new FormControl(this.data?.folder?.title ?? '', [
      Validators.required,
      this.unqueFolderNameValidator(this.folderTitles),
    ]),
  });

  isNew: boolean = true;

  onSubmit(): void {
    this.data = {
      title: this.myForm.value.title,
    };
    console.log(this.myForm.value.title);
    this.dialogRef.close(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close(null);
  }
  unqueFolderNameValidator(folderTitles: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (folderTitles.includes(control.value)) {
        return { uniqueFolderName: { value: control.value } };
      }
      return null;
    };
  }
}
