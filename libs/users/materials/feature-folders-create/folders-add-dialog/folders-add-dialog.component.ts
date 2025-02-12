import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'users-folders-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddDialogComponent {
  dialogRef = inject(MatDialogRef<FoldersAddDialogComponent>)
  formGroup = new FormGroup({
    newTitle: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(1)])
  });

  addSave() {
    this.dialogRef.close(this.formGroup.value.newTitle)
  }
  
  addClose(){
    this.dialogRef.close();
  }
}
