import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ADD_FOLDER_LIMITS } from '../../../../util/constant';
import { FormErrorStateMatcher } from '../../../../util/exceptions';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'add-folder-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatInputModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './add-folder-modal.component.html',
  styleUrls: ['./add-folder-modal.component.scss']
})
export class AddFolderModalComponent {
  public readonly ADD_FOLDER_LIMITS = ADD_FOLDER_LIMITS;
  public matcher: FormErrorStateMatcher = new FormErrorStateMatcher();
  public folderFormGroup!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createAddFolderForm();
  }

  createAddFolderForm(): void {
    this.folderFormGroup = this.fb.group({
      folderName: ['', [
        Validators.required,
        Validators.minLength(ADD_FOLDER_LIMITS.MIN_LENGTH),
        Validators.maxLength(ADD_FOLDER_LIMITS.MAX_LENGTH)
      ]]
    });
  }
}
