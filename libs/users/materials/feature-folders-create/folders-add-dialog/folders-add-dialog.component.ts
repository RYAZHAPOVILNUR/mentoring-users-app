import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateFolderDTO } from '../../data-access/src';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'users-folders-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
})
export class FoldersAddDialogComponent {
  dialogRef = inject(MatDialogRef);

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ])
  })

  submitFolderAdd(){
    console.log('submitFolderAdd: ', !this.form.invalid)
    if(!this.form.invalid){
      console.log('send folder add')
      const newFolder: CreateFolderDTO = {
        title: this.form.value.name as string,
      }
      this.dialogRef.close(newFolder);
    }
  }
}
