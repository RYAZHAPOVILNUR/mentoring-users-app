import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'add-folder-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './add-folder-modal.component.html',
  styleUrls: ['./add-folder-modal.component.scss']
})
export class AddFolderModalComponent {
  public folderFormGroup: FormGroup = new FormGroup({
    folderName: new FormControl('')
  });
}
