import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileType } from '@users/settings/data-access';
import { merge } from 'highcharts';
import { Store } from '@ngrx/store';
import { addMaterial } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
})
export class MaterialsAddDialogComponent {
  formTitle = ''
  title = new FormControl('', [Validators.required]);
  link = new FormControl('', [Validators.required]);
  folderId = 0
  errorMessage = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { folderId: number, dataType: FileType },
    private store: Store
  ) {
    if (data.dataType === FileType.PDF) {
      this.formTitle = 'Add pdf'
    }
    else if (data.dataType === FileType.VIDEO) {
      this.formTitle = 'Add video'
    }
    else if (data.dataType === FileType.MP3) {
      this.formTitle = 'Add MP3'
    }
    merge(this.title.statusChanges, this.title.valueChanges)
  }

  addMaterial() {
    if (this.link.value && this.title.value) {
      const newMaterial = {
        "title": this.title.value,
        "material_link": this.link.value,
        "folder_id": this.data.folderId
      }
      this.store.dispatch(addMaterial({ inputdata: newMaterial }))
    }
    else this.updateErrorMessage()
  }

  updateErrorMessage() {
    if (this.title.hasError('required') || this.link.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else {
      this.errorMessage = '';
    }
  }
}
